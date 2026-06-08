import { getSession } from '@/lib/auth';

type AdminHeaderProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
};

export async function AdminHeader({ title, description, actions }: AdminHeaderProps) {
  const session = await getSession();

  return (
    <header className="border-b border-border bg-card px-8 py-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-4">
          {actions}
          {session && (
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{session.name}</p>
              <p className="text-xs text-muted-foreground">{session.email}</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
