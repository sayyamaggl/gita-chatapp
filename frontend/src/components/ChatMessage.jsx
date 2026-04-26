import { motion } from 'framer-motion';
import { Bot, User, Loader2 } from 'lucide-react';

export default function ChatMessage({ role, content, isLoading }) {
  const isSystem = role === 'system';
  return (
    <motion.div className={`chat-msg ${isSystem ? 'system' : 'user'}`}
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="chat-avatar">
        {isSystem ? <Bot size={18} /> : <User size={18} />}
      </div>
      <div className="chat-bubble">
        {isLoading
          ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}><Loader2 size={14} className="spin" /> Thinking...</span>
          : content
        }
      </div>
    </motion.div>
  );
}
