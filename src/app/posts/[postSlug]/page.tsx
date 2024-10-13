import { getItemById, getPostBySlug } from "@/lib/directus";
import Container from "@/components/Container";


export default async function Post({ params }: { params: { postSlug: string }}) {
  const data = await getPostBySlug(params.postSlug, {
    fields: ['title', 'date_created', 'categories', 'body']
  });

  const categories = !Array.isArray(data.categories) ? [] : await Promise.all(data.categories.map(async (categoryId: number) => {
    const junction = await getItemById('posts_post_categories', categoryId);
    return getItemById('post_categories', junction.post_categories_id, { fields: ['title'] });
  }));

  return (
    <>
      <section className="bg-slate-50">
        <Container className="prose max-w-4xl -mt-8 py-28">
          <header className="text-center mx-auto mb-16">
            <h1 className="text-5xl leading-none mb-4">{ data.title }</h1>
            <p className="text-lg text-slate-600">
              Published { data.date_created && new Date(data.date_created).toLocaleDateString() } in { categories.map(({ title }) => title) }
            </p>
          </header>
          { Array.isArray(data.body?.blocks) && (
            <div>
              { data.body.blocks.map(block => {
                if ( block.type === 'header' ) {
                  return (
                    <h2 key={block.id} dangerouslySetInnerHTML={{
                      __html: block.data.text
                    }} />
                  )
                }
                if ( block.type === 'paragraph' ) {
                  return (
                    <p key={block.id} dangerouslySetInnerHTML={{
                      __html: block.data.text
                    }} />
                  )
                }
              }) }
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
