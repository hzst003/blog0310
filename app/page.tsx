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
            <div className="flex h-8 w-8 items-center justify-center text-primary transition-transform duration-200 group-hover:scale-110">
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
    href: "http://124.220.27.60:8502/",
    ariaLabel: "查看代码高亮相关文章",
    icon: (
      <Image
        src="/icons/xlsxreport_82918.png"
        alt="xlsx"
        width={30}
        height={30}
        className="h-[30px] w-[30px]"
      />
    ),
    title: "报表浏览",
    description: "xlsx报表浏览",
    footerLeft: "xlsx",
    footerRight: "查看",
  },
  {
    href: "http://124.220.27.60:8503/",
    ariaLabel: "xlsx",
    icon: (
      <Image
        src="/icons/xlsx57489.png"
        alt="主题切换"
        width={30}
        height={30}
        className="h-[30px] w-[30px]"
      />
    ),
    title: "xlsx工具箱",
    description: "xlsx拆分、合并、分组、匹配",
    footerLeft: "xlsx",
    footerRight: "查看",
  },
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
    href: "https://edgeone.hzst.online/",
    ariaLabel: " wasu",
    icon: (
      <Image
        src="/icons/logowasu01.png"
        alt="qrcode"
        width={30}
        height={30}
        className="h-[30px] w-[30px]"
      />
    ),
    title: "华数相关",
    description: "表格 工程信息 ",
    footerLeft: " ",
    footerRight: "进入 ",
  },


  {
    href: "/qrcode0210",
    ariaLabel: " 个性二维码生成",
    icon: (
      <Image
        src="/icons/qrcode138259.png"
        alt="qrcode"
        width={30}
        height={30}
        className="h-[30px] w-[30px]"
      />
    ),
    title: "个性二维码生成",
    description: "自定义颜色背景大小中心图 ",
    footerLeft: " ",
    footerRight: "进入 ",
  },

]

export default function Home() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-6 sm:px-6 sm:py-8">
      <header className="space-y-2 border-b border-border/60 pb-4" />

      <section className="grid gap-y-4 gap-x-3 md:grid-cols-2">
        {featureCards.map((card) => (
          <FeatureCard key={card.title} {...card} />
        ))}
      </section>

      <footer className="border-t border-border/60 pt-4 text-[11px] text-muted-foreground sm:pt-6">
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <p>© 2025 Xu.（AI 建站）保留所有权利.</p>
            <p className="text-[10px] text-muted-foreground/80">
              浙ICP备2025157769号
            </p>
            <p className="text-[10px] text-muted-foreground/80">
              浙公网安备33010502012241号
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
