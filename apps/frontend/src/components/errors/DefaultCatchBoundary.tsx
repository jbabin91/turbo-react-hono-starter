import { Button } from '@repo/ui';
import {
  ErrorComponent,
  type ErrorComponentProps,
  Link,
  rootRouteId,
  useMatch,
  useRouter,
} from '@tanstack/react-router';

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter();
  const isRoot = useMatch({
    select: (state) => state.id === rootRouteId,
    strict: false,
  });

  console.error(error);

  return (
    <div>
      <ErrorComponent error={error} />
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={() => router.invalidate()}>Try again</Button>
        {isRoot ? (
          <Link to="/">Home</Link>
        ) : (
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              window.history.back();
            }}
          >
            Go back
          </Link>
        )}
      </div>
    </div>
  );
}
