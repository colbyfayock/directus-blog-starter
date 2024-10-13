import { getPageBySlug } from "@/lib/pages";

import Container from "@/components/Container";

export default async function Post({
  params,
}: { params: { pageSlug: string } }) {
  const data = await getPageBySlug(params.pageSlug, {
    fields: ["title", "body"],
  });

  return (
    <>
      <section className="bg-slate-50">
        <Container className="prose max-w-4xl -mt-8 py-28">
          <header className="text-center mx-auto mb-16">
            <h1 className="text-5xl leading-none mb-4">{data.title}</h1>
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
