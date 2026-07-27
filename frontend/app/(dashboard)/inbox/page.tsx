'use client';

import { useQuery } from '@tanstack/react-query';
import { inboxService } from '@/services/inbox';
import { formatDistanceToNow } from 'date-fns';
import { Loader2, Mail, User, Clock, AlertCircle } from 'lucide-react';

export default function InboxPage() {
  const { data: messages, isLoading, isError } = useQuery({
    queryKey: ['inbox', 'messages'],
    queryFn: inboxService.getInboxMessages,
  });

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-destructive">
        <AlertCircle className="w-12 h-12 mb-4" />
        <h2 className="text-xl font-bold mb-2">Failed to load messages</h2>
        <p className="text-muted-foreground">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto h-[calc(100vh-80px)] overflow-y-auto">
      <div className="flex items-center gap-3 mb-8 border-b pb-4">
        <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-full text-primary">
          <Mail className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inbox</h1>
          <p className="text-muted-foreground">Messages from your public portfolio.</p>
        </div>
      </div>

      {!messages || messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border rounded-xl bg-slate-50 dark:bg-slate-900/50 border-dashed">
          <Mail className="w-16 h-16 text-muted-foreground/30 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No messages yet</h2>
          <p className="text-muted-foreground max-w-sm mx-auto">
            When visitors send you a message via your portfolio's contact form, they will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg._id} className="p-6 border rounded-xl bg-card shadow-sm transition-all hover:shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-secondary flex items-center justify-center rounded-full">
                    <User className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{msg.visitorName}</h3>
                    <a href={msg.visitorContact.includes('@') ? `mailto:${msg.visitorContact}` : '#'} className="text-sm text-primary hover:underline">
                      {msg.visitorContact}
                    </a>
                  </div>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  {formatDistanceToNow(new Date(msg.submittedAt), { addSuffix: true })}
                </div>
              </div>
              <div className="pl-0 md:pl-12">
                <p className="whitespace-pre-wrap text-card-foreground leading-relaxed">
                  {msg.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
