import { useEffect, useRef, useCallback } from 'react';
import SockJS from 'sockjs-client';
import { Client, Stomp, IFrame } from '@stomp/stompjs';
import { useDispatch } from 'react-redux';
import { addMessage, setConnectionStatus, setMyChatName } from '../../../slice/chatSlice';
import { ChatMessageDto, MessageType, ConnectionStatus } from '../../../types/chat';
import { useTokens } from '../../../config/useTokens';

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

  // Ref to hold the latest accessToken to avoid stale closures
  const accessTokenRef = useRef(accessToken);
  accessTokenRef.current = accessToken;

  const sendMessage = useCallback((content: string, type: MessageType = MessageType.CHAT) => {
    if (stompClientRef.current && stompClientRef.current.connected) {
      const chatMessage = {
        type: type,
        content: content,
      };
      stompClientRef.current.publish({
        destination: sendMessageDestination,
        body: JSON.stringify(chatMessage),
      });
    } else {
      console.warn('STOMP client not connected. Message not sent.');
    }
  }, [sendMessageDestination]);

  useEffect(() => {
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

        const sessionId = frame.headers['session'];
        client.subscribe(topic, (message) => {
          const chatMessage: ChatMessageDto = JSON.parse(message.body);
          if (chatMessage.type === MessageType.JOIN && chatMessage.sessionId === sessionId) {
            if (chatMessage.sender) {
              dispatch(setMyChatName(chatMessage.sender));
            }
          }
          dispatch(addMessage(chatMessage));
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
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (stompClientRef.current?.connected) {
        stompClientRef.current.deactivate();
      }
    };
  }, [dispatch, topic, websocketUrl, sendMessageDestination]); // Effect runs once on mount

  return { sendMessage };
};