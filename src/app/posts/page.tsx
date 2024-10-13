import Link from "next/link";

import { getPosts } from "@/lib/posts";

import Container from "@/components/Container";

export default async function Home() {
  const featuredPosts = await getPosts({
    limit: 6,
    fields: ["slug", "title", "date_created"],
  });

  return (
    <>
      <section className="bg-slate-50">
        <Container className="max-w-4xl -mt-8 py-28">
          <header className="text-center mx-auto mb-16">
            <h1 className="text-5xl leading-none mb-4">Posts</h1>
          </header>
          <ul className="grid gap-8">
            {featuredPosts.map((post) => {
              return (
                <li key={post.slug} className="space-y-1">
                  <h3 className="text-2xl">
                    <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-slate-600">
                    {post.date_created &&
                      new Date(post.date_created).toLocaleDateString()}
                  </p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
    </>
  );
}
