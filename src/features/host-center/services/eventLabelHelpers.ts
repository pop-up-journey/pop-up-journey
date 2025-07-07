export function getEventIcon(status: string) {
  switch (status) {
    case 'ongoing':
      return '📅';
    case 'ended':
      return '🎉';
    case 'upcoming':
      return '🚀';
    default:
      return '❓';
  }
}

export function getStatusLabel(status: string) {
  switch (status) {
    case 'ongoing':
      return '진행중';
    case 'ended':
      return '종료';
    case 'upcoming':
      return '예정';
    default:
      return status;
  }
}
