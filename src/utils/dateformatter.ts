import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export function formatDate(dateInput: string | Date) {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

  return format(date, 'M월 d일(EEE)', { locale: ko });
}
