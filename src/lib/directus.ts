import { createDirectus, readItem, readItems, rest } from '@directus/sdk';

interface ItemsQuery {
  limit?: number;
  fields?: Array<string> ;
}

interface Post {
  date_created?: string;
  categories?: Array<number>;
  body?: {
    time: number;
    blocks: Array<{
      id: string;
      type: string;
      data: {
        text: string;
        label?: number;
      }
    }>;
    version: string;
  };
  slug?: string;
  title?: string;
}

interface Category {
  id?: number;
  title?: string;
}

export const directus = createDirectus(String(process.env.NEXT_PUBLIC_DIRECTUS_API_ENDPOINT)).with(rest({
  onRequest: (options) => ({ ...options, cache: 'no-store' }),
}));

export async function getCollectionById(id: string) {
  return directus.request(readItems(id))
}

export async function getItemById(collection: string, id: number, options?: ItemsQuery) {
  return directus.request(readItem(collection, id, options));
}

export async function getPosts(options?: ItemsQuery): Promise<Array<Post>> {
  return directus.request(readItems('posts', options));
}

export async function getPostBySlug(slug: Post["slug"], options?: ItemsQuery): Promise<Post> {
  if ( !slug ) throw new Error('Invalid slug');
  return directus.request(readItem('posts', slug, options));
}

export async function getCategoriesById(id: Category["id"]): Promise<Category> {
  if ( !id ) throw new Error('Invalid ID');
  return getItemById('post_categories', id, { fields: ['title'] });
}

interface Home {
  id: number;
  services_title: string;
  services_subtitle: string;
  services_list: Array<{
    title: string;
    description: string;
  }>;
  quote_text: string;
  quote_name: string;
  quote_position: string;
  featured_title: string;
  hero_title: string;
  hero_subtitle: string;
  hero_cover: string;
  hero_buttons: Array<{
    label: string;
    link: string;
  }>;
  featured_posts: Array<number>;
}

export async function getHome() {
  return getCollectionById('home') as unknown as Home;
}

interface GlobalMetadata {
  id: number;
  tagline: string;
  title: string;
}

export async function getGlobalMetadata() {
  return directus.request(readItems('global')) as unknown as GlobalMetadata;;
}