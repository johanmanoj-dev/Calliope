import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6 md:py-12">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0 px-4 md:px-6">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by Calliope Team. Hosted anywhere. The source code is available on GitHub.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link href="/terms" className="text-muted-foreground hover:underline underline-offset-4">Terms</Link>
          <Link href="/privacy" className="text-muted-foreground hover:underline underline-offset-4">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
