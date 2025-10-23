import { useEffect, useRef, useCallback } from 'react';
import SockJS from 'sockjs-client';
import { Client, Stomp } from '@stomp/stompjs';
import { useDispatch } from 'react-redux';
import { addMessage, setConnectionStatus } from '../../../../src/slice/chatSlice';
import { ChatMessageDto, MessageType, ConnectionStatus } from '../../../../src/types/chat';

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
  }, [sendMessageDestination, dispatch]);

  const connect = useCallback(() => {
    dispatch(setConnectionStatus(ConnectionStatus.CONNECTING));
    const socket = new SockJS(websocketUrl);
    const stompClient = Stomp.over(socket);

    stompClient.onConnect = (frame) => {
      console.log('Connected: ' + frame);
      dispatch(setConnectionStatus(ConnectionStatus.CONNECTED));
      stompClient.subscribe(topic, (message) => {
        const chatMessage: ChatMessageDto = JSON.parse(message.body);
        dispatch(addMessage(chatMessage));
      });
    };

    stompClient.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
      dispatch(setConnectionStatus(ConnectionStatus.ERROR));
    };

    stompClient.onDisconnect = () => {
      console.log('Disconnected. Attempting to reconnect...');
      dispatch(setConnectionStatus(ConnectionStatus.DISCONNECTED));
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      reconnectTimeoutRef.current = setTimeout(connect, 5000); // 5초 후 재연결 시도
    };

    stompClient.activate();
    stompClientRef.current = stompClient;
  }, [websocketUrl, topic, dispatch, sendMessageDestination]);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (stompClientRef.current && stompClientRef.current.connected) {
        console.log('Disconnecting STOMP client.');
        sendMessage('님이 퇴장하셨습니다.', MessageType.LEAVE);
        stompClientRef.current.deactivate();
      }
    };
  }, [connect, sendMessage]);

  return { sendMessage };
};
