import { Conversation, Message } from './types';

// very simple in-memory conversation store to simulate backend
let CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    userId: '1',
    title: 'Network Security Basics',
    messages: [
      {
        id: 'm1',
        author: 'user',
        content: 'Hello AICT AI, can you explain the differences between IPv4 and IPv6?',
        timestamp: new Date('2023-10-24T08:42:00'),
      },
      {
        id: 'm2',
        author: 'assistant',
        content: "IPv4: 32-bit address... IPv6: 128-bit address...",
        timestamp: new Date('2023-10-24T08:42:05'),
      },
    ],
    createdAt: new Date('2023-10-24T08:42:00'),
    updatedAt: new Date('2023-10-24T08:42:05'),
  },
];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function getConversations(userId?: string): Promise<Conversation[]> {
  await delay(200);
  if (userId) {
    return CONVERSATIONS.filter((c) => c.userId === userId);
  }
  return [...CONVERSATIONS];
}

export async function createConversation(userId: string, title = 'New Conversation'): Promise<Conversation> {
  await delay(200);
  const newConv: Conversation = {
    id: `c${CONVERSATIONS.length + 1}`,
    userId,
    title,
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  CONVERSATIONS.push(newConv);
  return newConv;
}

export async function addMessage(conversationId: string, message: Message): Promise<Conversation | null> {
  await delay(200);
  const conv = CONVERSATIONS.find((c) => c.id === conversationId);
  if (!conv) return null;
  conv.messages.push(message);
  conv.updatedAt = new Date();
  return conv;
}
