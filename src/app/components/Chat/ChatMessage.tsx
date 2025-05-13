"use client";

import { Bot, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 ${isUser ? 'ml-3' : 'mr-3'} flex items-start`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isUser ? 'bg-[#0063B2]' : 'bg-[#0063B2]/10'
          }`}>
            {isUser ? (
              <User size={16} className="text-white" />
            ) : (
              <Bot size={16} className="text-[#0063B2]" />
            )}
          </div>
        </div>
        
        {/* Message content */}
        <div className={`rounded-lg p-4 ${
          isUser 
            ? 'bg-[#0063B2] text-white' 
            : 'bg-white text-gray-800 border border-gray-200'
        }`}>
          <div className="whitespace-pre-wrap">{message.content}</div>
          <div className={`text-xs mt-1 ${isUser ? 'text-white/70' : 'text-gray-500'}`}>
            {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
          </div>
        </div>
      </div>
    </div>
  );
}
