import { nanoid } from '@repo/utils';
import { type MiddlewareHandler } from 'hono';

const LogPrefix = {
  Error: 'err',
  Incoming: 'req',
  Outgoing: 'res',
} as const;

function humanize(times: string[]) {
  const [delimiter, separator] = [',', '.'];

  const orderTimes = times.map((v) =>
    v.replaceAll(/(\d)(?=(\d{3})+(?!\d))/g, `$1${delimiter}`),
  );

  return orderTimes.join(separator);
}

function time(start: number) {
  const delta = Date.now() - start;
  return humanize([
    delta < 1000 ? `${delta}ms` : `${Math.round(delta / 1000)}s`,
  ]);
}

type PrintFunc = (str: string, ...rest: string[]) => void;

function log(
  fn: PrintFunc,
  prefix: string,
  logId: string,
  method: string,
  path: string,
  status = 0,
  elapsed?: string,
  user?: string,
) {
  const out =
    prefix === LogPrefix.Incoming
      ? `${prefix} ${logId} ${method} ${path}`
      : `${prefix} ${logId} ${method} ${path} ${status} ${elapsed} ${user}`;
  fn(out);
}

export function logger(fn: PrintFunc = console.info): MiddlewareHandler {
  return async function logger(c, next) {
    const { method } = c.req;

    // Generate logId and set it so we can use it to match error reports
    const logId = nanoid();
    c.set('logId', logId);

    // Show path with search params
    const stripUrl = c.req.raw.url
      .replace(/(https?:\/\/)?([^/]+)/, '')
      .slice(0, 150);

    // Log incoming
    log(fn, LogPrefix.Incoming, logId, method, stripUrl);

    const start = Date.now();

    await next();

    // Add logging for user
    const user = c.get('user')?.id ?? 'na';

    // Log outgoing
    log(
      fn,
      LogPrefix.Outgoing,
      logId,
      method,
      stripUrl,
      c.res.status,
      time(start),
      user,
    );
  };
}
