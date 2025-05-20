import { format, parseISO } from 'date-fns';

export function formatDate(dateString) {
  if (!dateString) return '';
  
  const date = parseISO(dateString);
  return format(date, 'MMM d, yyyy');
}