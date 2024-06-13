import { type Context } from 'hono';

import { logEvent } from '../middleware';
import {
  type ErrorType,
  type EventData,
  type HttpErrorStatus,
  type Severity,
} from '../types';

export function createError(
  c: Context,
  status: HttpErrorStatus,
  type: string,
  severity: Severity = 'info',
  eventData?: EventData,
  err?: Error,
) {
  const message = '';

  const user = c.get('user');

  const error: ErrorType = {
    logId: c.get('logId'),
    message,
    method: c.req.method,
    path: c.req.path,
    severity,
    status,
    type,
    usr: user?.id,
  };

  if (err ?? ['warn', 'error'].includes(severity)) {
    // TODO: wire up error reporting
    // Log error messages
    console.error(err);
  } else if (eventData) {
    // Log significant events with additional data
    logEvent(message, eventData, severity);
  }

  return error;
}

export function errorResponse(
  c: Context,
  status: HttpErrorStatus,
  type: string,
  severity: Severity = 'info',
  eventData?: EventData,
  err?: Error,
) {
  const error: ErrorType = createError(
    c,
    status,
    type,
    severity,
    eventData,
    err,
  );

  // TODO: Review this assignment (as 400)
  return c.json({ error, success: false }, status as 400);
}
