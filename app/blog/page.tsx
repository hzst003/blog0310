import Link from "next/link"

import { getAllPosts } from "@/lib/posts"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"

export const metadata = {
  title: "Blog",
}

type PageProps = {
  searchParams?: Promise<{
    q?: string
    tag?: string
  }>
}

export default async function BlogPage({ searchParams }: PageProps) {
  const posts = getAllPosts()
  const { q, tag } = (await searchParams) ?? {}

  const query = q?.trim().toLowerCase() ?? ""
  const activeTag = tag?.trim().toLowerCase() ?? ""

  const filtered = posts.filter((post) => {
    const matchQuery =
      !query ||
      post.title.toLowerCase().includes(query) ||
      (post.description ?? "").toLowerCase().includes(query)

    const tags = post.tags ?? []
    const matchTag =
      !activeTag ||
      tags.some((t) => t.toLowerCase() === activeTag)

    return matchQuery && matchTag
  })

  const allTags = Array.from(
    new Set(
      posts.flatMap((post) => post.tags ?? []),
    ),
  ).sort()

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 py-10">
      <header className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">博客</h1>
          <p className="text-sm text-muted-foreground">
            使用 MDX 写文章，自动生成博客列表。支持按关键字和标签搜索。
          </p>
        </div>

        <form className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between" method="GET">
          <input
            type="search"
            name="q"
            defaultValue={q ?? ""}
            placeholder="搜索标题或简介…"
            className="h-9 w-full max-w-sm rounded-md border border-input bg-background px-3 text-sm shadow-sm outline-none ring-0 ring-offset-0 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
          />

          {allTags.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-muted-foreground">标签：</span>
              <Link
                href="/blog"
                className={`rounded-full border px-2.5 py-1 transition-colors ${
                  activeTag === ""
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                全部
              </Link>
              {allTags.map((t) => (
                <Link
                  key={t}
                  href={`/blog?tag=${encodeURIComponent(t)}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
                  className={`rounded-full border px-2.5 py-1 transition-colors ${
                    activeTag === t.toLowerCase()
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {t}
                </Link>
              ))}
            </div>
          ) : null}
        </form>
      </header>

      <div className="flex flex-col gap-4">
        {filtered.map((post) => (
          <Card key={post.slug} className="hover:bg-muted/60 transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <CardTitle>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:underline underline-offset-4"
                  >
                    {post.title}
                  </Link>
                </CardTitle>
                {post.date ? (
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {new Date(post.date).toLocaleDateString("zh-CN")}
                  </span>
                ) : null}
              </div>
              {post.tags && post.tags.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-1.5 text-xs text-muted-foreground">
                  {post.tags.map((t) => (
                    <Link
                      key={t}
                      href={`/blog?tag=${encodeURIComponent(t)}`}
                      className="rounded-full bg-muted px-2 py-0.5 hover:bg-muted/70"
                    >
                      #{t}
                    </Link>
                  ))}
                </div>
              ) : null}
            </CardHeader>
            {post.description ? (
              <CardDescription className="px-4 pb-4 text-sm text-muted-foreground">
                {post.description}
              </CardDescription>
            ) : null}
            <CardFooter className="flex justify-between border-t bg-muted/40 py-3 text-xs text-muted-foreground">
              <span>MDX 文章</span>
              <Link
                href={`/blog/${post.slug}`}
                className="font-medium text-primary hover:underline underline-offset-4"
              >
                阅读全文
              </Link>
            </CardFooter>
          </Card>
        ))}

        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            没有匹配的文章，可以尝试调整搜索关键字或清空标签。
          </p>
        ) : null}
      </div>
    </div>
  )
}

