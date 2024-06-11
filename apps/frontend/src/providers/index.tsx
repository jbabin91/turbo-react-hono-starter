import { TailwindIndicator, ThemeProvider, Toaster } from '@repo/ui';

import { TanstackQueryProvider } from './TanstackQueryProvider';
import { TanstackRouterProvider } from './TanstackRouterProvider';

export function Providers() {
  return (
    <ThemeProvider>
      <TanstackQueryProvider>
        <TanstackRouterProvider />
        <Toaster closeButton richColors />
        <TailwindIndicator />
      </TanstackQueryProvider>
    </ThemeProvider>
  );
}
