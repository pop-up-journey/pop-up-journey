import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export function formatDate(dateString: string) {
  return format(new Date(dateString), 'M월 d일(EEE)', { locale: ko });
}
