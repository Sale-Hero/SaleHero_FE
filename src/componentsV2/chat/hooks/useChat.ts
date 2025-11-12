import { useEffect, useRef, useCallback } from 'react';
import SockJS from 'sockjs-client';
import { Client, Stomp, IFrame } from '@stomp/stompjs';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, setConnectionStatus, setMyChatName } from '../../../slice/chatSlice';
import { ChatMessageDto, MessageType, ConnectionStatus } from '../../../types/chat';
import { useTokens } from '../../../config/useTokens';
import { RootState } from '../../../store';

interface UseChatProps {
  websocketUrl: string;
  topic: string;
  sendMessageDestination: string;
}

export const useChat = ({ websocketUrl, topic, sendMessageDestination }: UseChatProps) => {
  const stompClientRef = useRef<Client | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dispatch = useDispatch();
  const { accessToken } = useTokens();
  const { myChatName } = useSelector((state: RootState) => state.chat);
  const sessionNonce = useRef(`nonce_${Math.random().toString(36).substr(2, 9)}`);

  // Ref to hold the latest myChatName to avoid stale closures in the effect
  const myChatNameRef = useRef(myChatName);
  myChatNameRef.current = myChatName;

  // Ref to hold the latest accessToken to avoid stale closures
  const accessTokenRef = useRef(accessToken);
  accessTokenRef.current = accessToken;

  const sendMessage = useCallback((content: string, type: MessageType = MessageType.CHAT) => {
    if (stompClientRef.current && stompClientRef.current.connected) {
      // Only add nonce if we don't know our name yet
      const messageToSend = myChatName === null ? `${content}::${sessionNonce.current}` : content;
      const chatMessage = {
        type: type,
        content: messageToSend,
      };
      stompClientRef.current.publish({
        destination: sendMessageDestination,
        body: JSON.stringify(chatMessage),
      });
    } else {
      console.warn('STOMP client not connected. Message not sent.');
    }
  }, [myChatName, sendMessageDestination]);

  useEffect(() => {
    console.log("useChat EFFECT MOUNT");

    const connect = () => {
      dispatch(setConnectionStatus(ConnectionStatus.CONNECTING));
      const socket = new SockJS(websocketUrl);
      const client = Stomp.over(socket);

      // Disable debug messages from stompjs
      client.debug = () => {};

      // Use the token from the ref to ensure it's always up-to-date
      if (accessTokenRef.current) {
        client.connectHeaders = {
          Authorization: `Bearer ${accessTokenRef.current}`,
        };
      }

      client.onConnect = (frame: IFrame) => {
        dispatch(setConnectionStatus(ConnectionStatus.CONNECTED));
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
        }

        client.subscribe(topic, (message) => {
          const chatMessage: ChatMessageDto = JSON.parse(message.body);

          // Check for our nonce to identify ourselves, using the ref
          if (myChatNameRef.current === null && chatMessage.content.includes(`::${sessionNonce.current}`)) {
            if (chatMessage.sender) {
              dispatch(setMyChatName(chatMessage.sender));
            }
            // Create a new message object with the cleaned content
            const cleanedMessage = {
                ...chatMessage,
                content: chatMessage.content.split('::')[0]
            };
            dispatch(addMessage(cleanedMessage));
          } else {
            dispatch(addMessage(chatMessage));
          }
        });
      };

      client.onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
        dispatch(setConnectionStatus(ConnectionStatus.ERROR));
      };

      client.onDisconnect = () => {
        console.log('Disconnected. Attempting to reconnect in 5 seconds...');
        dispatch(setConnectionStatus(ConnectionStatus.DISCONNECTED));
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
        }
        // Re-establish connection after a delay
        reconnectTimeoutRef.current = setTimeout(connect, 5000);
      };

      client.activate();
      stompClientRef.current = client;
    };

    connect();

    return () => {
      console.log("useChat EFFECT CLEANUP");
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (stompClientRef.current) {
        console.log("Deactivating STOMP client");
        stompClientRef.current.deactivate();
      }
    };
  }, [dispatch, topic, websocketUrl, sendMessageDestination]); // Removed myChatName

  return { sendMessage };
};