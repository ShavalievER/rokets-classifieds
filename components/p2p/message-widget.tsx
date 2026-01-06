'use client';

import { useState, useTransition, useEffect } from 'react';
import { toast } from 'sonner';
import { getSellerById } from 'lib/demo/sellers';
import Image from 'next/image';

type Props = {
  sellerId: string;
  productTitle: string;
  productHandle: string;
};

type Message = {
  id: string;
  message: string;
  timestamp: Date;
  isSent: boolean;
};

export default function MessageWidget({ sellerId, productTitle, productHandle }: Props) {
  const seller = getSellerById(sellerId);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isPending, startTransition] = useTransition();

  // Load message history when chat opens
  useEffect(() => {
    if (isOpen && sellerId) {
      loadMessages();
    }
  }, [isOpen, sellerId]);

  const loadMessages = async () => {
    try {
      const response = await fetch(`/api/messages/send?sellerId=${sellerId}`);
      if (response.ok) {
        const data = await response.json();
        // Convert to Message format
        const formattedMessages: Message[] = data.map((msg: any) => ({
          id: msg.id,
          message: msg.message,
          timestamp: new Date(msg.timestamp),
          isSent: true
        }));
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!message.trim()) {
      return;
    }

    const newMessage: Message = {
      id: `temp_${Date.now()}`,
      message: message.trim(),
      timestamp: new Date(),
      isSent: true
    };

    // Optimistic update
    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    startTransition(async () => {
      try {
        const response = await fetch('/api/messages/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sellerId,
            productHandle,
            productTitle,
            message: newMessage.message
          })
        });

        if (response.ok) {
          const result = await response.json();
          // Update message with real ID
          setMessages(prev => 
            prev.map(msg => 
              msg.id === newMessage.id 
                ? { ...msg, id: result.messageId }
                : msg
            )
          );
        } else {
          // Remove failed message
          setMessages(prev => prev.filter(msg => msg.id !== newMessage.id));
          toast.error('Failed to send message');
        }
      } catch (error) {
        // Remove failed message
        setMessages(prev => prev.filter(msg => msg.id !== newMessage.id));
        toast.error('An error occurred while sending the message');
        console.error('Error:', error);
      }
    });
  };

  if (!seller) return null;

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-blue-600 px-6 py-4 shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl dark:bg-blue-500 dark:hover:bg-blue-600"
          aria-label="Open chat"
        >
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="font-semibold text-white">Chat</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[500px] w-[380px] flex-col rounded-lg border border-neutral-200 bg-white shadow-2xl dark:border-neutral-700 dark:bg-black">
          {/* Chat Header */}
          <div className="flex items-center gap-3 border-b border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-700 dark:bg-neutral-900">
            <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
              <Image src={seller.avatar} alt={seller.name} fill sizes="40px" className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-neutral-900 dark:text-white">{seller.name}</div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">Online</div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
              aria-label="Close chat"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">Start a conversation</p>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    Send a message to {seller.name}
                  </p>
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="flex justify-end">
                  <div className="max-w-[80%] rounded-lg bg-blue-600 px-3 py-2 text-sm text-white">
                    {msg.message}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSubmit} className="border-t border-neutral-200 p-3 dark:border-neutral-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white"
                disabled={isPending}
              />
              <button
                type="submit"
                disabled={isPending || !message.trim()}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
                aria-label="Send message"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

