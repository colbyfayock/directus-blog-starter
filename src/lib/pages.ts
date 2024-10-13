import { readItem, readItems } from '@directus/sdk';

import { directus, type ItemsQuery } from '@/lib/directus';

export interface Page {
  date_created?: string;
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
  navigation?: string;
  slug?: string;
  title?: string;
}

export async function getPages(options?: ItemsQuery): Promise<Array<Page>> {
  return directus.request(readItems('pages', options));
}

export async function getPageBySlug(slug: Page["slug"], options?: ItemsQuery): Promise<Page> {
  if ( !slug ) throw new Error('Invalid slug');
  return directus.request(readItem('pages', slug, options));
}