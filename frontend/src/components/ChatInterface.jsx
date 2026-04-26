import { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInputBar from './ChatInputBar';
import { sendChatMessage } from '../lib/api';

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Welcome, seeker. Ask me anything about the Bhagavad Gita — questions about life, duty, purpose, or any verse.' },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isTyping]);

  const handleSend = async (text) => {
    setMessages(p => [...p, { role: 'user', content: text }]);
    setIsTyping(true);
    try {
      const response = await sendChatMessage(text);
      setMessages(p => [...p, { role: 'system', content: response }]);
    } catch {
      setMessages(p => [...p, { role: 'system', content: 'My connection to divine wisdom was interrupted. Please try again.' }]);
    } finally { setIsTyping(false); }
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-message-list">
        {messages.map((m, i) => <ChatMessage key={i} role={m.role} content={m.content} />)}
        {isTyping && <ChatMessage role="system" isLoading />}
        <div ref={endRef} />
      </div>
      <ChatInputBar onSend={handleSend} disabled={isTyping} />
    </div>
  );
}
