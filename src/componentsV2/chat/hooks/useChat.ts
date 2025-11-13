import { useEffect, useRef, useCallback } from 'react';
import SockJS from 'sockjs-client';
import { Client, Stomp, IFrame } from '@stomp/stompjs';
import { useDispatch } from 'react-redux';
import { addMessage, setConnectionStatus, setMyChatName, setMySessionId } from '../../../slice/chatSlice';
import { ChatMessageDto, MessageType, ConnectionStatus } from '../../../types/chat';

// Helper function to get/set a persistent client ID
const getClientId = () => {
    let clientId = localStorage.getItem('salehero_chat_clientId');
    if (!clientId) {
        clientId = `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('salehero_chat_clientId', clientId);
    }
    return clientId;
};

interface UseChatProps {
  websocketUrl: string;
  topic: string;
  sendMessageDestination: string;
}

export const useChat = ({ websocketUrl, topic, sendMessageDestination }: UseChatProps) => {
  const stompClientRef = useRef<Client | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dispatch = useDispatch();

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
    const clientId = getClientId();
    console.log("Using Client ID:", clientId);

    const connect = () => {
      dispatch(setConnectionStatus(ConnectionStatus.CONNECTING));
      const socket = new SockJS(websocketUrl);
      const client = Stomp.over(socket);

      client.debug = () => {};

      client.connectHeaders = {
          login: clientId,
      };
      console.log("Connecting with headers:", client.connectHeaders);

      client.onConnect = (frame: IFrame) => {
        dispatch(setConnectionStatus(ConnectionStatus.CONNECTED));
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
        }

        // Subscribe to public topic
        client.subscribe(topic, (message) => {
          const chatMessage: ChatMessageDto = JSON.parse(message.body);
          dispatch(addMessage(chatMessage));
        });

        // Subscribe to private channel for self-identification
        console.log("Subscribing to /user/queue/private");
        client.subscribe('/user/queue/private', (message) => {
            console.log("Received message on /user/queue/private:", message.body);
            const chatMessage: ChatMessageDto = JSON.parse(message.body);
            if (chatMessage.type === MessageType.SYSTEM) {
                if (chatMessage.sender) {
                    dispatch(setMyChatName(chatMessage.sender));
                }
                if (chatMessage.sessionId) {
                    dispatch(setMySessionId(chatMessage.sessionId));
                }
            }
        });

        // Signal to the server that we are ready to receive messages
        console.log("Publishing to /app/chat.ready");
        client.publish({ destination: '/app/chat.ready' });
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
      if (stompClientRef.current?.deactivate) {
        stompClientRef.current.deactivate();
      }
    };
  }, [dispatch, topic, websocketUrl, sendMessageDestination]);

  return { sendMessage };
};
