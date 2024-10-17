import type { Metadata } from "next";

import { getGlobalMetadata, getItemById } from "@/lib/directus";
import { getPostBySlug } from "@/lib/posts";

import Container from "@/components/Container";

interface PostParams {
  params: {
    postSlug: string;
  }
}

export async function generateMetadata({ params }: PostParams): Promise<Metadata> {
  const global = await getGlobalMetadata();
  const post = await getPostBySlug(params.postSlug, {
    fields: ["title"],
  });
  return {
    title: `${post.title} - ${global.title}`,
    // description: '' // Add new field for excerpt or SEO Metadata
  }
}

export default async function PostPage({ params }: PostParams) {
  const data = await getPostBySlug(params.postSlug, {
    fields: ["title", "body", "categories.post_categories_slug"],
  });

  const categorySlugs = data.categories?.filter(category => typeof category === 'object').map(({ post_categories_slug }) => post_categories_slug);

  const categories = categorySlugs && await Promise.all(categorySlugs.map(async categorySlug => {
    return getItemById('post_categories', categorySlug, { fields: ['title'] });
  }));

  return (
    <>
      <section className="bg-slate-50">
        <Container className="prose max-w-4xl -mt-8 py-28">
          <header className="text-center mx-auto mb-16">
            <h1 className="text-5xl leading-none mb-4">{data.title}</h1>
            <p className="text-lg text-slate-600">
              Published{" "}
              {data.date_created &&
                new Date(data.date_created).toLocaleDateString()}{" "}
              in {categories?.map(({ title }) => title).join(', ') || 'None'}
            </p>
          </header>
          {Array.isArray(data.body?.blocks) && (
            <div>
              {data.body.blocks.map((block) => {
                if (block.type === "header") {
                  return (
                    <h2
                      key={block.id}
                      dangerouslySetInnerHTML={{
                        __html: block.data.text,
                      }}
                    />
                  );
                }
                if (block.type === "paragraph") {
                  return (
                    <p
                      key={block.id}
                      dangerouslySetInnerHTML={{
                        __html: block.data.text,
                      }}
                    />
                  );
                }
              })}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
