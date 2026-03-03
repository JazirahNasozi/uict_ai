'use client';

import React, { useEffect, useState } from 'react';
import { getConversations } from '@/lib/conversations';
import { Conversation } from '@/lib/types';
import { useAuth } from '@/lib/auth-context';
import Card from '@/app/components/Card';

export default function ConversationsPage() {
  const { user } = useAuth();
  const [convs, setConvs] = useState<Conversation[]>([]);

  useEffect(() => {
    load();
  }, [user]);

  const load = async () => {
    if (!user) return;
    const data = await getConversations(user.role === 'admin' ? undefined : user.id);
    setConvs(data);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Conversation Logs</h1>
      {convs.length === 0 ? (
        <p className="text-gray-500">No conversations found.</p>
      ) : (
        <div className="space-y-3">
          {convs.map((c) => (
            <Card key={c.id} className="flex justify-between items-center">
              <div>
                <div className="font-medium">{c.title}</div>
                <div className="text-xs text-gray-500">
                  {new Date(c.updatedAt).toLocaleString()}
                </div>
              </div>
              <div className="text-sm text-gray-600">{c.messages.length} msg</div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
