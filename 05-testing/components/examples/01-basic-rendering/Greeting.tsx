interface GreetingProps {
  name: string
}

export function Greeting({ name }: GreetingProps) {
  return <h2>Hello, {name}!</h2>
}
