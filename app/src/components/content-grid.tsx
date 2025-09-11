export default function ContentGrid({
  children,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={`content-grid ${props.className}`}>{children}</div>;
}
