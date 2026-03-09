import Link from "next/link"
import { notFound } from "next/navigation"
import { compileMDX } from "next-mdx-remote/rsc"
import type { MDXRemoteProps } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypePrettyCode from "rehype-pretty-code"

import { getPostBySlug } from "@/lib/posts"
import { mdxComponents } from "@/components/mdx"

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
  }
}

export async function generateStaticParams() {
  // Use dynamic import to avoid fs access on edge runtimes
  const { getAllPosts } = await import("@/lib/posts")
  const posts = getAllPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: "github-dark",
              keepBackground: false,
            },
          ],
        ] as MDXRemoteProps["options"]["mdxOptions"]["rehypePlugins"],
      },
    },
  })

  return (
    <article className="mx-auto max-w-3xl py-10">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            {post.date ? (
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("zh-CN")}
              </time>
            ) : null}
            {post.description ? (
              <>
                <span>·</span>
                <span>{post.description}</span>
              </>
            ) : null}
          </div>

          {post.tags && post.tags.length > 0 ? (
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span>标签：</span>
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
        </div>
      </header>

      <div className="prose prose-neutral dark:prose-invert max-w-none prose-pre:bg-muted prose-pre:border prose-pre:border-border">
        {content}
      </div>
    </article>
  )
}

