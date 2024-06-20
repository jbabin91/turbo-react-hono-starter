import { Button } from '@repo/ui';
import { Link } from '@tanstack/react-router';

import { useAuthStore } from '@/modules/auth';

export function NotFound({ children }: { children?: React.ReactNode }) {
  const auth = useAuthStore();

  return (
    <div className="space-y-2 p-2">
      <div>
        {children ?? <p>The page you are looking for does not exist.</p>}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={() => window.history.back()}>Go back</Button>
        <Link to={auth.isAuthenticated ? '/dashboard' : '/'}>Start Over</Link>
      </div>
    </div>
  );
}
