import { readItem, readItems } from '@directus/sdk';

import { directus, type ItemsQuery } from '@/lib/directus';

export interface Post {
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

export async function getPosts(options?: ItemsQuery): Promise<Array<Post>> {
  return directus.request(readItems('posts', options));
}

export async function getPostBySlug(slug: Post["slug"], options?: ItemsQuery): Promise<Post> {
  if ( !slug ) throw new Error('Invalid slug');
  return directus.request(readItem('posts', slug, options));
}