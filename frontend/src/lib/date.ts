import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatRelativeTime = (date: string | Date) => {
  if (!date) return 'Data não informada';

  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: ptBR,
  });
};
