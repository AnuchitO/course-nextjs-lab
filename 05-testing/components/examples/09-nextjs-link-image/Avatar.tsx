import Image from 'next/image'

export function Avatar({ name, src }: { name: string; src: string }) {
  return <Image src={src} alt={`${name}'s avatar`} width={48} height={48} />
}
