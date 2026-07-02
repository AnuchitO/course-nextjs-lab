const USERS: Record<string, { id: string; name: string }> = {
  '1': { id: '1', name: 'Ada Lovelace' },
  '2': { id: '2', name: 'Grace Hopper' },
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const user = USERS[id]

  if (!user) {
    return new Response(null, { status: 404 })
  }

  return Response.json(user)
}
