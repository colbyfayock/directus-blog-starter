import { readItem, readItems } from "@directus/sdk";

import { type ItemsQuery, directus } from "@/lib/directus";
import type { Block } from '@/types/fields';

export interface Post {
  date_created?: string;
  categories?: Array<number | {
    post_categories_slug: string;
  }>;
  body?: {
    time: number;
    blocks: Array<Block>;
    version: string;
  };
  slug?: string;
  title?: string;
}

export async function getPosts(options?: ItemsQuery): Promise<Array<Post>> {
  return directus.request(readItems("posts", options));
}

export async function getPostBySlug(
  slug: Post["slug"],
  options?: ItemsQuery,
): Promise<Post> {
  if (!slug) throw new Error("Invalid slug");
  return directus.request(readItem("posts", slug, options));
}
