import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useChat } from './hooks/useChat';
import { RootState } from '../../store';
import { ConnectionStatus, MessageType } from '../../types/chat';
import { Box, TextField, Button, Typography, Paper, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const WEBSOCKET_URL = `${process.env.REACT_APP_BASE_URL}/ws-chat`; // 백엔드 WebSocket 엔드포인트
const CHAT_TOPIC = '/topic/chat';
const SEND_MESSAGE_DESTINATION = '/app/chat.sendMessage';

const Chat = () => {
    const [messageInput, setMessageInput] = useState('');
    const messages = useSelector((state: RootState) => state.chat.messages);
    const connectionStatus = useSelector((state: RootState) => state.chat.connectionStatus);

    const { sendMessage } = useChat({
        websocketUrl: WEBSOCKET_URL,
        topic: CHAT_TOPIC,
        sendMessageDestination: SEND_MESSAGE_DESTINATION,
    });

    const messageContainerRef = useRef<HTMLDivElement>(null);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (messageInput.trim()) {
            sendMessage(messageInput);
            setMessageInput('');
        }
    };

    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <Paper elevation={3} sx={{
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 200px)',
            maxWidth: '800px',
            margin: '0 auto',
            overflow: 'hidden',
        }}>
            <Box sx={{
                padding: '16px',
                backgroundColor: '#f5f5f5',
                borderBottom: '1px solid #e0e0e0',
            }}>
                <Typography variant="h6" component="h2">
                    익명 채팅방
                </Typography>
                {connectionStatus === ConnectionStatus.ERROR && <Typography variant="caption" sx={{ color: 'red' }}>error</Typography>}
                {connectionStatus === ConnectionStatus.DISCONNECTED && <Typography variant="caption" sx={{ color: 'grey' }}>disconnected</Typography>}
            </Box>
            <Box ref={messageContainerRef} sx={{
                flexGrow: 1,
                position: 'relative', // For positioning the loading indicator
                padding: '16px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                backgroundColor: '#f9f9f9',
            }}>
                {connectionStatus === ConnectionStatus.CONNECTING ? (
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                    }}>
                        <CircularProgress sx={{ color: '#FFCD00' }} />
                        <Typography variant="h6" sx={{ color: 'orange' }}>
                            연결중입니다...
                        </Typography>
                    </Box>
                ) : (
                    messages.map((msg, index) => {
                        if (msg.type === MessageType.JOIN || msg.type === MessageType.LEAVE) {
                            return (
                                <Typography
                                    key={index}
                                    variant="body2"
                                    sx={{
                                        textAlign: 'center',
                                        color: 'grey.600',
                                        fontStyle: 'italic',
                                        width: '100%',
                                    }}
                                >
                                    {msg.content}
                                </Typography>
                            );
                        }
                        return (
                            <Box key={index} sx={{
                                display: 'flex',
                                alignItems: 'baseline',
                                backgroundColor: '#e9ecef',
                                padding: '8px 12px',
                                borderRadius: '18px',
                                maxWidth: '80%',
                                wordBreak: 'break-word',
                            }}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold', marginRight: '8px', color: '#333' }}>
                                    {`익명의 ${msg.sender}`}:
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#555' }}>
                                    {msg.content}
                                </Typography>
                            </Box>
                        );
                    })
                )}
            </Box>
            <Box component="form" onSubmit={handleSendMessage} sx={{
                display: 'flex',
                padding: '16px',
                borderTop: '1px solid #e0e0e0',
                alignItems: 'center',
            }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="메시지를 입력하세요..."
                    size="small"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    multiline
                    maxRows={4}
                    sx={{
                        mr: 1,
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
                <Button type="submit" variant="contained" endIcon={<SendIcon />} sx={{
                    backgroundColor: '#FFCD00',
                    color: 'black',
                    whiteSpace: 'nowrap',
                    '&:hover': {
                        backgroundColor: '#F29727',
                    }
                }}>
                    전송
                </Button>
            </Box>
        </Paper>
    );
};

export default Chat;
