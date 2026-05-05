type Props = {
  className?: string
}

export default function HairlineDivider({ className = '' }: Props) {
  return <hr className={`border-0 h-px bg-hairline ${className}`} />
}
