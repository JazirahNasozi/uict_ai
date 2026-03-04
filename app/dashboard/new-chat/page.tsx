'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { createConversation, addMessage } from '@/lib/conversations';
import { Message } from '@/lib/types';

export default function NewChatPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user && !conversationId) {
      createConversation(user.id, 'New Chat').then((conv) => {
        setConversationId(conv.id);
      });
    }
  }, [user, conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const simulateAIResponse = async (userMessage: string): Promise<string> => {
    // Simple mock responses based on keywords
    const lowerMsg = userMessage.toLowerCase();
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
      return "Hello! I'm Pearl_labs uict AI. How can I help you with your studies today?";
    } else if (lowerMsg.includes('writing')) {
      return "I can help with writing assignments, essays, reports, and more. What topic are you working on?";
    } else if (lowerMsg.includes('exam') || lowerMsg.includes('practice')) {
      return "For exam practice, I can create quizzes, explain concepts, or provide study tips. What subject?";
    } else if (lowerMsg.includes('presentation')) {
      return "Need help with presentations? I can assist with outlines, content creation, or slide ideas.";
    } else if (lowerMsg.includes('mock')) {
      return "Mock exams are great for preparation. Tell me the subject and I'll generate some questions.";
    } else if (lowerMsg.includes('image')) {
      return "For image creation, describe what you need and I'll help generate ideas or descriptions.";
    } else {
      return "That's interesting! Can you tell me more about what you're working on?";
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !conversationId || !user) return;

    const userMessage: Message = {
      id: `m${Date.now()}`,
      author: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      await addMessage(conversationId, userMessage);

      // Simulate AI response
      const aiContent = await simulateAIResponse(input.trim());
      const aiMessage: Message = {
        id: `m${Date.now() + 1}`,
        author: 'assistant',
        content: aiContent,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      await addMessage(conversationId, aiMessage);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!user) {
    return <div className="p-6">Please log in to start a chat.</div>;
  }

  return (
    <div className="p-6 sm:p-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-1">New Chat</h1>
      <p className="text-gray-600 mb-6">Start a conversation with Pearl_labs uict AI.</p>

      <div className="max-w-xl mx-auto">
        <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col h-96">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <p className="text-lg">👋 Welcome to Pearl_labs uict AI!</p>
                <p className="mt-2">Ask me anything about writing, exams, presentations, or more.</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.author === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.author === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {msg.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">
                  <p className="text-sm">AI is typing...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="space-y-2">
            {/* Selected File Display */}
            {selectedFile && (
              <div className="flex items-center justify-between bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 text-sm">
                  <span>📎</span>
                  <span className="text-gray-700">{selectedFile.name}</span>
                  <span className="text-gray-500 text-xs">({(selectedFile.size / 1024).toFixed(1)} KB)</span>
                </div>
                <button
                  onClick={handleRemoveFile}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            )}
            
            {/* Input Controls */}
            <div className="flex space-x-2">
              <div className="flex-1 flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 pl-2 pr-4 py-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={loading}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={loading}
                  className="text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Attach file"
                >
                  📎
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 border-0 outline-none ml-2 bg-transparent"
                  disabled={loading}
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Quick Action Tags */}
        <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-gray-500">
          {[
            {label: '✍️ Writing', href: '/dashboard/writing'},
            {label: '📚 Exam Practice', href: '/dashboard/exam-practice'},
            {label: '📊 Presentation', href: '/dashboard/presentation'},
            {label: '🎭 Mocks', href: '/dashboard/mocks'},
            {label: '🎨 Create Image', href: '/dashboard/create-image'},
          ].map(item => (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className="px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}