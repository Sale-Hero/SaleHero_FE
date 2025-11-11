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
  const dispatch = useDispatch();
  const { accessToken } = useTokens();

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
    if (!stompClientRef.current) {
      const socket = new SockJS(websocketUrl);
      const client = Stomp.over(socket);

      client.onConnect = (frame: IFrame) => {
        dispatch(setConnectionStatus(ConnectionStatus.CONNECTED));
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
        console.log('Disconnected.');
        dispatch(setConnectionStatus(ConnectionStatus.DISCONNECTED));
      };

      stompClientRef.current = client;
    }

    const client = stompClientRef.current;

    if (accessToken && !client.connected) {
      console.log('Connecting STOMP client...');
      dispatch(setConnectionStatus(ConnectionStatus.CONNECTING));
      client.connectHeaders = { Authorization: `Bearer ${accessToken}` };
      client.activate();
    }

    return () => {
      if (stompClientRef.current?.connected) {
        console.log('Deactivating STOMP client on cleanup.');
        stompClientRef.current.deactivate();
      }
    };
  }, [accessToken, dispatch, topic, websocketUrl]);

  return { sendMessage };
};
