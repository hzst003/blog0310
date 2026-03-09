import type { ComponentProps, ReactNode } from "react"

type MdxComponent = (props: any) => JSX.Element

export const mdxComponents: Record<string, MdxComponent> = {
  h1: (props: ComponentProps<"h1">) => (
    <h1
      className="mb-4 mt-8 scroll-m-20 text-3xl font-semibold tracking-tight"
      {...props}
    />
  ),
  h2: (props: ComponentProps<"h2">) => (
    <h2
      className="mb-3 mt-6 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight"
      {...props}
    />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3
      className="mb-2 mt-5 scroll-m-20 text-xl font-semibold tracking-tight"
      {...props}
    />
  ),
  p: (props: ComponentProps<"p">) => <p className="my-3" {...props} />,
  a: (props: ComponentProps<"a">) => (
    <a
      className="font-medium text-primary underline-offset-4 hover:underline"
      {...props}
    />
  ),
  ul: (props: ComponentProps<"ul">) => (
    <ul className="my-3 ml-6 list-disc space-y-1" {...props} />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol className="my-3 ml-6 list-decimal space-y-1" {...props} />
  ),
  li: (props: ComponentProps<"li">) => <li {...props} />,
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote
      className="mt-4 border-l-2 border-border pl-4 text-sm text-muted-foreground"
      {...props}
    />
  ),
  code: (props: ComponentProps<"code">) => (
    <code
      className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono"
      {...props}
    />
  ),
  pre: (props: ComponentProps<"pre">) => (
    <pre
      className="my-4 overflow-x-auto rounded-lg border border-border bg-muted px-4 py-3 text-xs leading-relaxed"
      {...props}
    />
  ),
  table: (props: ComponentProps<"table">) => (
    <div className="my-4 w-full overflow-x-auto">
      <table
        className="w-full border-collapse text-sm [&_th]:border [&_th]:bg-muted [&_th]:px-3 [&_th]:py-2 [&_td]:border [&_td]:px-3 [&_td]:py-2"
        {...props}
      />
    </div>
  ),

  /* 常用内容组件 */
  Note: ({ children }: { children: ReactNode }) => (
    <div className="mt-4 flex gap-2 rounded-md border border-primary/30 bg-primary/5 px-3 py-2 text-sm">
      <span className="mt-[2px] text-xs font-semibold text-primary">NOTE</span>
      <div>{children}</div>
    </div>
  ),
  Warning: ({ children }: { children: ReactNode }) => (
    <div className="mt-4 flex gap-2 rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-950 dark:text-amber-50">
      <span className="mt-[2px] text-xs font-semibold">WARNING</span>
      <div>{children}</div>
    </div>
  ),
  Steps: ({ children }: { children: ReactNode }) => (
    <ol className="my-4 space-y-3 border-l border-border pl-4 text-sm">
      {children}
    </ol>
  ),
  Step: ({
    children,
    title,
  }: {
    children: ReactNode
    title?: string
  }) => (
    <li className="relative pl-2">
      <span className="absolute -left-4 top-1 size-2 rounded-full bg-primary" />
      {title ? (
        <div className="mb-1 font-medium leading-snug">{title}</div>
      ) : null}
      <div className="text-muted-foreground">{children}</div>
    </li>
  ),
}

