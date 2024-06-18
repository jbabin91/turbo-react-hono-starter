import { type EventData, type Severity } from '../../types';

export function logEvent(
  message: string,
  eventData?: EventData,
  severity: Severity = 'info',
) {
  if (eventData) {
    console[severity]('logEvent:', message, eventData);
  } else {
    console[severity]('logEvent:', message);
  }
}
