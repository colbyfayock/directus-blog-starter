import { Orbit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { getHome } from "@/lib/directus";
import { getPosts } from "@/lib/posts";

import Container from "@/components/Container";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const data = await getHome();

  const featuredPosts = await getPosts({
    limit: 6,
    fields: ["slug", "title", "date_created"],
  });

  return (
    <>
      <section className="bg-slate-50">
        <Container className="-mt-8 py-28">
          <div className="max-w-3xl text-center space-y-10 mx-auto mb-20">
            <h1 className="text-5xl leading-none">{data.hero_title}</h1>
            <p className="text-xl">{data.hero_subtitle}</p>
            {data.hero_buttons.length > 0 && (
              <ul>
                {data.hero_buttons.map((button) => {
                  return (
                    <li key={button.label}>
                      <Button asChild size="lg" className="font-bold">
                        <Link href={button.link}>{button.label}</Link>
                      </Button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <Image
            className="block aspect-[21/9] object-cover rounded-lg"
            width="2100"
            height="900"
            src={`${process.env.NEXT_PUBLIC_DIRECTUS_API_ENDPOINT}/assets/${data.hero_cover}`}
            alt=""
            sizes="100vw"
          />
        </Container>
      </section>
      <section>
        <Container className="py-28">
          <div className="max-w-3xl text-center space-y-10 mx-auto mb-28">
            <Orbit className="inline-block w-10 h-auto" />
            <h2 className="text-4xl">{data.services_title}</h2>
            <p className="text-lg">{data.services_subtitle}</p>
          </div>
          {data.services_list.length > 0 && (
            <ul className="grid grid-cols-3 gap-12">
              {data.services_list.map((service) => {
                return (
                  <li key={service.title} className="space-y-4">
                    <Orbit className="w-6 h-auto" />
                    <h3 className="text-lg font-bold leading-snug">
                      {service.title}
                    </h3>
                    <p>{service.description}</p>
                  </li>
                );
              })}
            </ul>
          )}
        </Container>
      </section>
      <section className="bg-slate-900 text-white">
        <Container className="py-36">
          <div className="max-w-3xl text-center mx-auto">
            <p className="text-4xl italic font-serif mb-12">
              {data.quote_text}
            </p>
            <p className="text-sm">{data.quote_name}</p>
            <p className="text-sm text-slate-400">{data.quote_position}</p>
          </div>
        </Container>
      </section>
      <section>
        <Container className="py-28">
          <h2 className="text-4xl mb-12">{data.featured_title}</h2>
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
