type Status = 'online' | 'away' | 'offline'

const LABELS: Record<Status, string> = {
  online: 'Online',
  away: 'Away',
  offline: 'Offline',
}

export function Badge({ status }: { status: Status }) {
  return (
    <span role="status" data-status={status}>
      {LABELS[status]}
    </span>
  )
}
