import Image from "next/image"
import Link from "next/link"
import { BookOpen, FilePlus2, Tag, Sparkles } from "lucide-react"
import type { ReactNode } from "react"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

const linkBaseClasses =
  "group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"

const cardBaseClasses =
  "flex h-full flex-col justify-between border-border/60 bg-card/80 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-muted/60 hover:shadow-sm active:translate-y-0 active:scale-[0.99]"

const footerPillClasses =
  "inline-flex items-center rounded-md border border-border bg-background/80 px-2.5 py-1 font-medium text-primary transition-colors group-hover:border-primary/40 group-hover:bg-background group-hover:text-primary group-active:border-primary/60 group-active:text-primary"

type FeatureCardProps = {
  href: string
  ariaLabel: string
  icon: ReactNode
  title: string
  description: ReactNode
  content?: ReactNode
  footerLeft: ReactNode
  footerRight: ReactNode
}

function FeatureCard({
  href,
  ariaLabel,
  icon,
  title,
  description,
  content,
  footerLeft,
  footerRight,
}: FeatureCardProps) {
  return (
    <Link href={href} className={linkBaseClasses} aria-label={ariaLabel}>
      <Card data-slot="card" className={cardBaseClasses}>
        <CardHeader className="space-y-2 pb-2">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-110 group-hover:bg-primary/15">
              {icon}
            </div>
            <CardTitle className="text-base font-semibold tracking-tight">
              {title}
            </CardTitle>
          </div>
          <CardDescription className="text-xs text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>

        {content ? (
          <CardContent className="text-xs text-muted-foreground pb-2 pt-0">
            {content}
          </CardContent>
        ) : null}

        <CardFooter className="flex items-center justify-between border-t bg-muted/40 py-2.5 text-xs text-muted-foreground">
          <span>{footerLeft}</span>
          <span className={footerPillClasses}>{footerRight}</span>
        </CardFooter>
      </Card>
    </Link>
  )
}

const featureCards: FeatureCardProps[] = [
  {
    href: "/blog",
    ariaLabel: "查看所有博客文章",
    icon: <BookOpen className="h-4 w-4" aria-hidden="true" />,
    title: "博客列表",
    description: "查看所有文章，按关键字和标签快速筛选。",
    footerLeft: "Route: /blog",
    footerRight: "进入博客",
  },
  {
    href: "/blog/mdx-writing",
    ariaLabel: "查看 MDX 写作技巧",
    icon: <FilePlus2 className="h-4 w-4" aria-hidden="true" />,
    title: "写一篇新文章",
    description: (
      <>
        在 <code>content/posts</code> 中新增一个 <code>.mdx</code> 文件即可。
      </>
    ),
    content: (
      <>
        <p>例如：</p>
        <pre className="mt-2 rounded-md bg-muted px-3 py-2">
          <code>my-new-post.mdx</code>
        </pre>
      </>
    ),
    footerLeft: "本地文件系统直接编辑",
    footerRight: "查看写作技巧",
  },
  {
    href: "/blog?tag=MDX",
    ariaLabel: "按 MDX 标签筛选文章",
    icon: <Tag className="h-4 w-4" aria-hidden="true" />,
    title: "按标签阅读",
    description: (
      <>
        在文章 Frontmatter 中设置 <code>tags</code>，列表页即可筛选。
      </>
    ),
    content: (
      <pre className="rounded-md bg-muted px-3 py-2">
        <code>{`tags:
  - Next.js
  - MDX`}</code>
      </pre>
    ),
    footerLeft: "最多展示前两类标签",
    footerRight: "按 MDX 标签浏览",
  },
  {
    href: "/blog/code-highlighting",
    ariaLabel: "查看 MDX 组件与代码高亮示例",
    icon: <Sparkles className="h-4 w-4" aria-hidden="true" />,
    title: "组件化 MDX",
    description: (
      <>
        使用统一的 MDX 组件，比如 <code>&lt;Note /&gt;</code> 和{" "}
        <code>&lt;Warning /&gt;</code>。
      </>
    ),
    content: (
      <>
        <p>示例：</p>
        <pre className="mt-2 rounded-md bg-muted px-3 py-2">
          <code>{`<Note>这是一个提示。</Note>
<Warning>这是一个警告。</Warning>`}</code>
        </pre>
      </>
    ),
    footerLeft: "定义于 components/mdx.tsx",
    footerRight: "查看组件示例",
  },
  {
    href: "/blog?tag=Next.js",
    ariaLabel: "按 Next.js 标签筛选文章",
    icon: (
      <Image
        src="/icons/nextjs.png"
        alt="Next.js 文章"
        width={16}
        height={16}
        className="h-4 w-4"
      />
    ),
    title: "Next.js 文章",
    description: "聚焦 Next.js 相关实践与最佳实践。",
    footerLeft: "标签：Next.js",
    footerRight: "查看 Next.js 文章",
  },
  {
    href: "/blog?tag=MDX",
    ariaLabel: "查看 MDX 写作与组件文章",
    icon: (
      <Image
        src="/icons/mdx.png"
        alt="MDX 写作"
        width={16}
        height={16}
        className="h-4 w-4"
      />
    ),
    title: "MDX 写作",
    description: "学习如何用 MDX 写出结构清晰的技术文章。",
    footerLeft: "标签：MDX",
    footerRight: "浏览 MDX 文章",
  },
  {
    href: "/blog?tag=代码高亮",
    ariaLabel: "查看代码高亮相关文章",
    icon: (
      <Image
        src="/icons/code.png"
        alt="代码高亮"
        width={16}
        height={16}
        className="h-4 w-4"
      />
    ),
    title: "代码高亮",
    description: "探索 Shiki、rehype-pretty-code 等高亮方案。",
    footerLeft: "标签：代码高亮",
    footerRight: "查看高亮文章",
  },
  {
    href: "/blog?tag=Dark%20Mode",
    ariaLabel: "查看暗色模式与主题切换文章",
    icon: (
      <Image
        src="/icons/dark-mode.png"
        alt="主题切换"
        width={16}
        height={16}
        className="h-4 w-4"
      />
    ),
    title: "主题与暗色模式",
    description: "基于 next-themes 与 shadcn/ui 的主题切换实现。",
    footerLeft: "标签：Dark Mode",
    footerRight: "查看主题文章",
  },
]

export default function Home() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-6 sm:px-6 sm:py-8">
      <header className="space-y-2 border-b border-border/60 pb-4">
        <p className="text-sm font-medium text-primary">欢迎来到我的博客</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Next.js + MDX 的极简技术博客
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          所有文章使用 MDX 编写，配合 Tailwind CSS、shadcn/ui 和 Shiki
          代码高亮。你可以快速浏览文章、按标签筛选，也可以直接在{" "}
          <code>content/posts</code> 里写自己的内容。
        </p>
      </header>

      <section className="grid gap-y-4 gap-x-3 md:grid-cols-2">
        {featureCards.map((card) => (
          <FeatureCard key={card.title} {...card} />
        ))}
      </section>

      <footer className="border-t border-border/60 pt-4 text-[11px] text-muted-foreground sm:pt-6">
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <p>
              © {new Date().getFullYear()} Xu   </p>
            <p className="text-[10px] text-muted-foreground/80">
              备案号：浙ICP备 00000000 号-1
            </p>
          </div>
          <div className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>AI 生成内容，持续更新中</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
