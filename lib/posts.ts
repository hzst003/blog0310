import fs from "fs"
import path from "path"
import matter from "gray-matter"

const POSTS_PATH = path.join(process.cwd(), "content", "posts")

export type PostMeta = {
  title: string
  date: string
  description?: string
  slug: string
  tags?: string[]
}

export type Post = PostMeta & {
  content: string
}

function getPostSlugs() {
  if (!fs.existsSync(POSTS_PATH)) return []
  return fs
    .readdirSync(POSTS_PATH)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
}

export function getAllPosts(): PostMeta[] {
  const slugs = getPostSlugs()

  const posts = slugs
    .map((slug) => {
      const fullPath = path.join(POSTS_PATH, `${slug}.mdx`)
      const file = fs.readFileSync(fullPath, "utf8")
      const { data } = matter(file)

      const rawTags = data.tags
      const tags =
        Array.isArray(rawTags) && rawTags.length > 0
          ? rawTags.map((t) => String(t))
          : undefined

      return {
        title: data.title ?? slug,
        date: data.date ?? "",
        description: data.description ?? "",
        slug,
        tags,
      } as PostMeta
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))

  return posts
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(POSTS_PATH, `${slug}.mdx`)
  if (!fs.existsSync(fullPath)) return null

  const file = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(file)

  return {
    title: (data.title as string) ?? slug,
    date: (data.date as string) ?? "",
    description: (data.description as string) ?? "",
    slug,
    tags: Array.isArray(data.tags)
      ? data.tags.map((t: unknown) => String(t))
      : undefined,
    content,
  }
}

