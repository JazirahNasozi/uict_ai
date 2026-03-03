'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Conversation, Message } from '@/lib/types';
import { getConversations, createConversation, addMessage } from '@/lib/conversations';
import Card from '@/app/components/Card';
import Input from '@/app/components/Input';
import Button from '@/app/components/Button';

export default function AssistantPage() {
  const { user } = useAuth();
  const [currentConv, setCurrentConv] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newText, setNewText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    loadConversation();
  }, [user]);

  const loadConversation = async () => {
    if (!user) return;
    const convs = await getConversations(user.id);
    let conv = convs[0];
    if (!conv) {
      conv = await createConversation(user.id);
    }
    setCurrentConv(conv);
    setMessages(conv.messages);
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!newText.trim() || !currentConv) return;
    const userMsg: Message = {
      id: `m${Date.now()}`,
      author: 'user',
      content: newText,
      timestamp: new Date(),
    };
    setMessages((m) => [...m, userMsg]);
    setNewText('');

    // fake assistant reply after short delay
    setTimeout(async () => {
      const reply: Message = {
        id: `m${Date.now() + 1}`,
        author: 'assistant',
        content: 'This is a mock response from UICT AI assistant. Feel free to replace with real API.',
        timestamp: new Date(),
      };
      setMessages((m) => [...m, reply]);
      if (currentConv) {
        await addMessage(currentConv.id, userMsg);
        await addMessage(currentConv.id, reply);
      }
    }, 600);
  };

  return (
    <div className="p-6 flex flex-col h-full">
      <h1 className="text-2xl font-bold mb-4">AI Conversational Assistant</h1>
      <div className="flex-1 overflow-auto border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
        {messages.map((msg) => (
          <div key={msg.id} className={msg.author === 'user' ? 'text-right mb-2' : 'text-left mb-2'}>
            <span
              className={`inline-block px-3 py-2 rounded-lg max-w-[80%] ${
                msg.author === 'user' ? 'bg-blue-100 text-blue-900' : 'bg-green-100 text-green-900'
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="mt-4 flex gap-2">
        <Input
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button onClick={handleSend} variant="primary">Send</Button>
      </div>
    </div>
  );
}
