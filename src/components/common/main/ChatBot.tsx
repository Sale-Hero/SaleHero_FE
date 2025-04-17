import { useState, useRef, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
    Box,
    Paper,
    TextField,
    IconButton,
    Typography,
    Slide
} from '@mui/material';
import { Send, Close, ShoppingCart } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const ChatBotIcon = styled(motion.div)`
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 70px;
    height: 70px;
    cursor: pointer;
    z-index: 1000;
    filter: drop-shadow(0 4px 8px rgba(242, 151, 39, 0.3));

    &:hover {
        transform: scale(1.05);
    }
`;

const ChatWindow = styled(Paper)`
    position: fixed;
    bottom: 100px;
    right: 20px;
    width: 360px;
    height: 500px;
    display: flex;
    flex-direction: column;
    z-index: 1000;
    overflow: hidden;
    border-radius: 20px;
    border: 1px solid rgba(255, 205, 0, 0.3);
    box-shadow: 0 8px 32px rgba(242, 151, 39, 0.15);
    background: rgba(255, 255, 255, 0.95);
`;

const ChatHeader = styled(Box)`
    background: linear-gradient(45deg, #F29727 30%, #FFCD00 90%);
    color: white;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ChatBody = styled(Box)`
    flex: 1;
    padding: 16px;
    overflow-y: auto;
    background: rgba(255, 252, 242, 0.7);
`;

const ChatInputArea = styled(Box)`
    padding: 16px;
    background: white;
    border-top: 1px solid rgba(255, 205, 0, 0.3);
    display: flex;
    gap: 8px;
`;

const Message = styled(Box)<{ isUser?: boolean }>`
    max-width: 80%;
    margin: 8px 0;
    padding: 12px 16px;
    border-radius: 16px;
    background: ${props => props.isUser ? 'linear-gradient(45deg, #F29727 30%, #FFCD00 90%)' : 'white'};
    color: ${props => props.isUser ? 'white' : '#333'};
    align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
    box-shadow: 0 2px 8px rgba(242, 151, 39, ${props => props.isUser ? '0.2' : '0.1'});
`;

interface ChatMessage {
    id: number;
    text: string;
    isUser: boolean;
}

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 1,
            text: '안녕하세요! Sale Hero 할인 도우미입니다. 할인 정보나 쇼핑 관련 질문이 있으신가요? 😊',
            isUser: false
        }
    ]);

    // 채팅 영역에 대한 ref 생성
    const chatBodyRef = useRef<HTMLDivElement>(null);

    // 메시지 목록이 변경될 때마다 스크롤을 맨 아래로 이동
    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!message.trim()) return;

        // 사용자 메시지 추가
        const userMessage: ChatMessage = {
            id: messages.length + 1,
            text: message,
            isUser: true
        };

        setMessages(prev => [...prev, userMessage]);
        const currentMessage = message;
        setMessage('');

        try {
            // 로딩 메시지 추가
            setMessages(prev => [...prev, {
                id: prev.length + 1,
                text: "답변을 생성하고 있습니다...",
                isUser: false
            }]);

            const response = await fetch(
                `${process.env.REACT_APP_BASE_URL}/chatbot?query=${encodeURIComponent(currentMessage)}`
            );

            if (!response.ok) {
                throw new Error('API request failed');
            }

            // 텍스트로 응답을 받습니다
            const text = await response.text();

            // 로딩 메시지 제거하고 실제 응답 추가
            setMessages(prev => {
                const filteredMessages = prev.filter(msg => msg.text !== "답변을 생성하고 있습니다...");
                return [...filteredMessages, {
                    id: prev.length + 1,
                    text: text,
                    isUser: false
                }];
            });
        } catch (error) {
            console.error('Error fetching response:', error);
            // 에러 메시지 표시
            setMessages(prev => {
                const filteredMessages = prev.filter(msg => msg.text !== "답변을 생성하고 있습니다...");
                return [...filteredMessages, {
                    id: prev.length + 1,
                    text: "죄송합니다. 잠시 후 다시 시도해주세요.",
                    isUser: false
                }];
            });
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            <ChatBotIcon
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="60" cy="60" r="56" fill="#FFCD00" />
                    <circle cx="60" cy="60" r="52" fill="#F29727" />
                    <rect x="35" y="40" width="50" height="45" rx="8" fill="white" />
                    <path d="M60 25 L60 35" stroke="white" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="60" cy="22" r="4" fill="white" />
                    <circle cx="45" cy="55" r="5" fill="#F29727" />
                    <circle cx="75" cy="55" r="5" fill="#F29727" />
                    <path d="M45 70 Q60 80 75 70" stroke="#F29727" strokeWidth="4" fill="none" strokeLinecap="round" />
                    <circle cx="28" cy="60" r="4" fill="white" />
                    <circle cx="92" cy="60" r="4" fill="white" />
                </svg>
            </ChatBotIcon>

            <AnimatePresence>
                {isOpen && (
                    <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
                        <ChatWindow>
                            <ChatHeader>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <ShoppingCart sx={{ fontSize: 24 }} />
                                    <Typography variant="h6" fontWeight={600}>할인 도우미</Typography>
                                </Box>
                                <IconButton
                                    size="small"
                                    onClick={() => setIsOpen(false)}
                                    sx={{ color: 'white' }}
                                >
                                    <Close />
                                </IconButton>
                            </ChatHeader>

                            <ChatBody ref={chatBodyRef}>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1
                                }}>
                                    {messages.map((msg) => (
                                        <Message key={msg.id} isUser={msg.isUser}>
                                            <Typography variant="body1">{msg.text}</Typography>
                                        </Message>
                                    ))}
                                </Box>
                            </ChatBody>

                            <ChatInputArea>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="특가 정보가 궁금하신가요?"
                                    size="small"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    multiline
                                    maxRows={4}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'rgba(255, 205, 0, 0.5)',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#FFCD00',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#F29727',
                                            },
                                        }
                                    }}
                                />
                                <IconButton
                                    onClick={handleSend}
                                    disabled={!message.trim()}
                                    sx={{
                                        backgroundColor: message.trim() ? 'rgba(255, 205, 0, 0.1)' : 'transparent',
                                        color: '#F29727',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 205, 0, 0.2)',
                                        }
                                    }}
                                >
                                    <Send />
                                </IconButton>
                            </ChatInputArea>
                        </ChatWindow>
                    </Slide>
                )}
            </AnimatePresence>
        </>
    );
}