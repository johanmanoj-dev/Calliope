'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { inboxService, IMessage } from '@/services/inbox';
import { formatDistanceToNow } from 'date-fns';
import { Loader2, Mail, User, Clock, AlertCircle, ArrowLeft, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FRONTEND_ROUTES } from '@shared/constants/routes';

import { useRouter } from 'next/navigation';

export default function InboxPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [selectedForDelete, setSelectedForDelete] = useState<IMessage | null>(null);

  const { data: messages, isLoading, isError } = useQuery({
    queryKey: ['inbox', 'messages'],
    queryFn: inboxService.getInboxMessages,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => inboxService.deleteMessage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inbox', 'messages'] });
      setSelectedForDelete(null);
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-destructive min-h-[50vh]">
        <AlertCircle className="w-12 h-12 mb-4" />
        <h2 className="text-xl font-bold mb-2">Failed to load messages</h2>
        <p className="text-muted-foreground mb-4">Please try again later.</p>
        <Button variant="outline" size="sm" asChild>
          <Link href={FRONTEND_ROUTES.DASHBOARD}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full overflow-y-auto p-4 sm:p-8 py-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="hover:bg-muted font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>

        <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-full text-primary">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inbox</h1>
            <p className="text-muted-foreground text-sm">Messages sent by visitors on your public portfolio.</p>
          </div>
        </div>
      </div>

      {!messages || messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border rounded-xl bg-slate-50 dark:bg-slate-900/50 border-dashed">
          <Mail className="w-16 h-16 text-muted-foreground/30 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No messages yet</h2>
          <p className="text-muted-foreground max-w-sm mx-auto text-sm">
            When visitors send you a message via your portfolio's contact form, they will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg._id} className="p-6 border rounded-xl bg-card shadow-sm transition-all hover:shadow-md relative group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center rounded-full shrink-0">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{msg.visitorName}</h3>
                    <a href={msg.visitorContact.includes('@') ? `mailto:${msg.visitorContact}` : '#'} className="text-sm text-primary hover:underline">
                      {msg.visitorContact}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-auto">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5 mr-1" />
                    {formatDistanceToNow(new Date(msg.submittedAt), { addSuffix: true })}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    title="Delete message"
                    onClick={() => setSelectedForDelete(msg)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="pl-0 md:pl-13">
                <p className="whitespace-pre-wrap text-card-foreground leading-relaxed text-sm bg-muted/30 p-4 rounded-lg border">
                  {msg.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal Popup */}
      {selectedForDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-card border shadow-xl rounded-2xl p-6 max-w-md w-full space-y-4">
            <div className="flex items-center gap-3 text-destructive">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <Trash2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Delete Message?</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Are you sure you want to delete the message from <strong className="text-foreground">{selectedForDelete.visitorName}</strong>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedForDelete(null)}
                disabled={deleteMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteMutation.mutate(selectedForDelete._id)}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Deleting...</>
                ) : (
                  'Delete Message'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
