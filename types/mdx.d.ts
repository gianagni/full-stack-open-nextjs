declare module "*.mdx" {
  const MDXComponent: (props: Record<string, unknown>) => React.JSX.Element
  export default MDXComponent
}
