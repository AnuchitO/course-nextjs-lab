// A component that throws on render when told to — stands in for
// "some component deep in the tree crashed unexpectedly".
export function Bomb({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) throw new Error('Boom')
  return <p>Rendered fine</p>
}
