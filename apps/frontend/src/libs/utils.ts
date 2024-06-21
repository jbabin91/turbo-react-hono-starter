import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(calendar);
dayjs.extend(relativeTime);

// Format a date to a relative time
export function dateShort(date?: string | Date | null) {
  if (!date) return '-';

  return dayjs(date).calendar(null, {
    lastDay: '[Yesterday], H:mm',
    lastWeek: 'dddd, H:mm',
    sameDay: '[Today], H:mm',
    sameElse: (now: dayjs.Dayjs) => {
      const monthDiff = now.diff(dayjs(date), 'month');
      if (monthDiff <= 3) return dayjs(date).format('MMM D, H:mm');
      return dayjs(date).format('MMM D, YYYY');
    },
  });
}
