export function Text({ value, variant }) {
  const Tag = variant === "title" ? "h1" : "p"
  return <Tag>{value}</Tag>
}
