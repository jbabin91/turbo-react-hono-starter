// Set i18n instance before starting server
import './libs/i18n';

import { serve } from '@hono/node-server';

import { env } from './configs';
import app from './server';

const main = () => {
  serve(
    {
      fetch: app.fetch,
      hostname: '0.0.0.0',
      port: Number(env.PORT),
    },
    (info) => {
      console.log(`Sever is running on http://${info.address}:${info.port}`);
    },
  );
};

main();
