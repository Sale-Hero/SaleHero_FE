import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useChat } from './hooks/useChat';
import { RootState } from '../../store';
import { ConnectionStatus, MessageType } from '../../types/chat';
import { Box, TextField, Button, Typography, Paper, CircularProgress, Avatar, useTheme } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { motion } from 'framer-motion';

const WEBSOCKET_URL = `${process.env.REACT_APP_BASE_URL}/ws-chat`;
const CHAT_TOPIC = '/topic/chat';
const SEND_MESSAGE_DESTINATION = '/app/chat.sendMessage';

const Chat = () => {
    const [messageInput, setMessageInput] = useState('');
    const messages = useSelector((state: RootState) => state.chat.messages);
    const connectionStatus = useSelector((state: RootState) => state.chat.connectionStatus);
    const myChatName = useSelector((state: RootState) => state.chat.myChatName);
    const theme = useTheme();

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
        <Paper elevation={0} sx={{
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 120px)',
            maxWidth: '1024px',
            margin: '20px auto',
            overflow: 'hidden',
            borderRadius: theme.shape.borderRadius,
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.default,
        }}>
            <Box sx={{
                padding: '16px 24px',
                backgroundColor: theme.palette.background.paper,
                borderBottom: `1px solid ${theme.palette.divider}`,
            }}>
                <Typography variant="h5" component="h2" fontWeight={600} color={theme.palette.text.primary}>
                    커뮤니티 채팅
                </Typography>
                {connectionStatus === ConnectionStatus.ERROR && <Typography variant="caption" sx={{ color: 'red' }}>연결 오류</Typography>}
                {connectionStatus === ConnectionStatus.DISCONNECTED && <Typography variant="caption" sx={{ color: 'grey' }}>연결 끊김</Typography>}
            </Box>
            <Box ref={messageContainerRef} sx={{
                flexGrow: 1,
                position: 'relative',
                padding: '24px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
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
                        <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
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
                                        color: theme.palette.text.secondary,
                                        fontStyle: 'italic',
                                        width: '100%',
                                    }}
                                >
                                    {msg.content}
                                </Typography>
                            );
                        }
                        const isCurrentUser = myChatName !== null && msg.sender === myChatName;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    display: 'flex',
                                    justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
                                    width: '100%',
                                }}
                            >
                                <Box sx={{
                                    display: 'flex',
                                    gap: '10px',
                                    maxWidth: '70%',
                                    alignItems: 'flex-start',
                                    flexDirection: isCurrentUser ? 'row-reverse' : 'row',
                                }}>
                                    <Avatar sx={{
                                        bgcolor: isCurrentUser ? theme.palette.primary.main : theme.palette.secondary.main,
                                        width: 32,
                                        height: 32,
                                        fontSize: '0.875rem',
                                    }}>
                                        {msg.sender ? msg.sender.charAt(0).toUpperCase() : 'U'}
                                    </Avatar>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: isCurrentUser ? 'flex-end' : 'flex-start' }}>
                                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary, mb: 0.5, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {msg.sender || '익명'}
                                            {msg.createdAt && (
                                                <Typography variant="caption" sx={{ color: theme.palette.text.disabled, fontSize: '0.7rem' }}>
                                                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </Typography>
                                            )}
                                        </Typography>
                                        <Paper
                                            elevation={1}
                                            sx={{
                                                padding: '10px 14px',
                                                borderRadius: isCurrentUser ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                                                backgroundColor: isCurrentUser ? theme.palette.primary.main : theme.palette.background.paper,
                                                color: isCurrentUser ? theme.palette.primary.contrastText : theme.palette.text.primary,
                                                wordBreak: 'break-word',
                                                boxShadow: theme.shadows[1],
                                            }}
                                        >
                                            <Typography variant="body1">
                                                {msg.content}
                                            </Typography>
                                        </Paper>
                                    </Box>
                                </Box>
                            </motion.div>
                        );
                    })
                )}
            </Box>
            <Box component="form" onSubmit={handleSendMessage} sx={{
                display: 'flex',
                padding: '16px 24px',
                borderTop: `1px solid ${theme.palette.divider}`,
                alignItems: 'center',
                backgroundColor: theme.palette.background.paper,
            }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="메시지를 입력하세요..."
                    size="small"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage(e);
                        }
                    }}
                    multiline
                    maxRows={5}
                    sx={{
                        mr: 2,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: theme.shape.borderRadius,
                            '& fieldset': {
                                borderColor: theme.palette.divider,
                            },
                            '&:hover fieldset': {
                                borderColor: theme.palette.primary.light,
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: theme.palette.primary.main,
                                borderWidth: '1px',
                            },
                        }
                    }}
                />
                <Button type="submit" variant="contained" endIcon={<SendIcon />} disabled={!messageInput.trim()} sx={{
                    py: 1.2,
                    px: 3,
                    borderRadius: theme.shape.borderRadius,
                    color: 'white',
                    background: `linear-gradient(45deg, ${theme.palette.warning.dark} 30%, ${theme.palette.warning.light} 90%)`,
                    boxShadow: `0 4px 10px rgba(242, 151, 39, 0.2)`,
                    '&:hover': {
                        background: `linear-gradient(45deg, ${theme.palette.warning.main} 30%, ${theme.palette.warning.dark} 90%)`,
                        boxShadow: `0 6px 12px rgba(242, 151, 39, 0.3)`,
                        transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap',
                    '&.Mui-disabled': {
                        background: theme.palette.action.disabledBackground,
                        boxShadow: 'none',
                        color: theme.palette.action.disabled,
                    }
                }}>
                    전송
                </Button>
            </Box>
        </Paper>
    );
};

export default Chat;
