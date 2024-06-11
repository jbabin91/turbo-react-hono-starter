import { QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

import { queryClient as reactQueryClient } from '@/libs/react-query';

export function TanstackQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => reactQueryClient);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
