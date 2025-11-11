import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useChat } from './hooks/useChat';
import { RootState } from '../../store';
import { ConnectionStatus, MessageType } from '../../types/chat';
import { Box, TextField, Button, Typography, Paper, CircularProgress, Avatar, useTheme } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { motion } from 'framer-motion';
import { getChatHistoryAsync } from '../../slice/chatSlice';

const WEBSOCKET_URL = `${process.env.REACT_APP_BASE_URL}/ws-chat`;
const CHAT_TOPIC = '/topic/chat';
const SEND_MESSAGE_DESTINATION = '/app/chat.sendMessage';

const Chat = () => {
    const [messageInput, setMessageInput] = useState('');
    const [countdown, setCountdown] = useState(0);
    const dispatch = useDispatch<any>();
    const messages = useSelector((state: RootState) => state.chat.messages);
    const connectionStatus = useSelector((state: RootState) => state.chat.connectionStatus);
    const myChatName = useSelector((state: RootState) => state.chat.myChatName);
    const theme = useTheme();
    const isBlocked = countdown > 0;

    const { sendMessage } = useChat({
        websocketUrl: WEBSOCKET_URL,
        topic: CHAT_TOPIC,
        sendMessageDestination: SEND_MESSAGE_DESTINATION,
    });

    const messageContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const isSendingRef = useRef(false);
    const messagesLengthRef = useRef(messages.length);
    const messageTimestampsRef = useRef<number[]>([]);

    useEffect(() => {
        // Fetch chat history when the component mounts
        dispatch(getChatHistoryAsync());
    }, [dispatch]);

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown(prev => prev > 0 ? prev - 1 : 0);
            }, 1000);
        }

        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [countdown]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (isSendingRef.current || isBlocked) return;

        const now = Date.now();
        messageTimestampsRef.current = messageTimestampsRef.current.filter(
            timestamp => now - timestamp < 1000
        );

        if (messageTimestampsRef.current.length >= 3) {
            setCountdown(5);
            return;
        }

        const messageToSend = messageInput.trim();
        if (messageToSend) {
            messageTimestampsRef.current.push(now);
            isSendingRef.current = true;
            sendMessage(messageToSend);
            setMessageInput('');
        }
    };

    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }

        // Check if a message was just sent and the message list has updated.
        if (isSendingRef.current && messages.length > messagesLengthRef.current) {
            isSendingRef.current = false;
            inputRef.current?.focus();
        }

        messagesLengthRef.current = messages.length;
    }, [messages]);

    const blockMessageText = `메시지를 너무 빨리 보냈습니다. ${countdown}초 후에 다시 시도하세요.`;

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
                        const previousMsg = messages[index - 1];
                        const showDateSeparator =
                            !previousMsg ||
                            (msg.createdAt && previousMsg.createdAt && new Date(msg.createdAt).toDateString() !== new Date(previousMsg.createdAt).toDateString());

                        const messageContent = () => {
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
                        };

                        return (
                            <React.Fragment key={index}>
                                {showDateSeparator && msg.createdAt && (
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            textAlign: 'center',
                                            color: theme.palette.text.secondary,
                                            margin: '16px 0',
                                            fontWeight: 600,
                                        }}
                                    >
                                        {new Date(msg.createdAt).toLocaleDateString('ko-KR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </Typography>
                                )}
                                {messageContent()}
                            </React.Fragment>
                        );
                    })
                )}
            </Box>
            <Box component="form" sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '16px 24px',
                borderTop: `1px solid ${theme.palette.divider}`,
                backgroundColor: theme.palette.background.paper,
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder={isBlocked ? blockMessageText : "메시지를 입력하세요..."}
                        size="small"
                        value={messageInput}
                        disabled={isBlocked}
                        onChange={(e) => {
                            if (isSendingRef.current) return;
                            setMessageInput(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage(e);
                            }
                        }}
                        multiline
                        maxRows={5}
                        inputRef={inputRef}
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
                                '&.Mui-disabled': {
                                    backgroundColor: theme.palette.action.disabledBackground,
                                }
                            }
                        }}
                    />
                    <Button type="button" onClick={handleSendMessage} variant="contained" endIcon={<SendIcon />} disabled={!messageInput.trim() || isBlocked} sx={{
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
                {isBlocked && (
                    <Typography variant="caption" color="error" sx={{ mt: 1, textAlign: 'center' }}>
                        {blockMessageText}
                    </Typography>
                )}
            </Box>
        </Paper>
    );
};

export default Chat;
