import { Button, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { useNavigate } from '@tanstack/react-router';

import { type User } from '@/types';

export function UserCard({ user }: { user: User }) {
  const navigate = useNavigate();

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle>User</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <ul className="grid gap-3">
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">First Name:</span>
            <span>{user.firstName}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Last Name:</span>
            <span>{user.lastName}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Email:</span>
            <span>{user.email}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Language:</span>
            <span>{user.language}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Role:</span>
            <span className="capitalize">{user.role.toLowerCase()}</span>
          </li>
        </ul>
        <div className="flex justify-end">
          <Button
            onClick={() =>
              navigate({
                params: { userId: user.id },
                search: { edit: true },
                to: '/dashboard/users/$userId',
              })
            }
          >
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
