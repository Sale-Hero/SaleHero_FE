import { useEffect, useRef, useCallback } from 'react';
import SockJS from 'sockjs-client';
import { Client, Stomp } from '@stomp/stompjs';
import { useDispatch } from 'react-redux';
import { addMessage, ChatMessageDto } from '../../../../src/slice/chatSlice';

interface UseChatProps {
  websocketUrl: string;
  topic: string;
  sendMessageDestination: string;
}

export const useChat = ({ websocketUrl, topic, sendMessageDestination }: UseChatProps) => {
  const stompClientRef = useRef<Client | null>(null);
  const dispatch = useDispatch();

  const sendMessage = useCallback((content: string) => {
    if (stompClientRef.current && stompClientRef.current.connected) {
      const chatMessage = {
        type: 'CHAT',
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
    const socket = new SockJS(websocketUrl);
    const stompClient = Stomp.over(socket);

    stompClient.onConnect = (frame) => {
      console.log('Connected: ' + frame);

      stompClient.subscribe(topic, (message) => {
        const chatMessage: ChatMessageDto = JSON.parse(message.body);
        dispatch(addMessage(chatMessage));
      });
    };

    stompClient.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      if (stompClientRef.current && stompClientRef.current.connected) {
        console.log('Disconnecting STOMP client.');
        stompClientRef.current.deactivate();
      }
    };
  }, [websocketUrl, topic, dispatch]);

  return { sendMessage };
};
