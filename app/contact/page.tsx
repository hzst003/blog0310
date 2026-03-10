export default function ContactPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Tel:13018932057</h1>
      <p className="text-sm text-muted-foreground">
        
      </p>

      <div className="mt-4 grid grid-cols-5 gap-4 justify-items-center">
        <a
          href="#"
          aria-label="Email"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-xl hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          📧
        </a>
        <a
          href="#"
          aria-label="GitHub"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-xl hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          🐙
        </a>
        <a
          href="#"
          aria-label="Gitee"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-xl hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          🐧
        </a>
        <a
          href="#"
          aria-label="WeChat"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-xl hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          💬
        </a>
        <a
          href="#"
          aria-label="Blog RSS"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-xl hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          📓
        </a>
      </div>
    </div>
  )
}
