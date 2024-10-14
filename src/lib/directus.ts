import { createDirectus, readItem, readItems, rest } from "@directus/sdk";

export interface ItemsQuery {
  limit?: number;
  fields?: Array<string>;
  filter?: Record<string, {
    _eq: string | number;
  }>;
}

export const directus = createDirectus(
  String(process.env.NEXT_PUBLIC_DIRECTUS_API_ENDPOINT),
).with(
  rest({
    onRequest: (options) => ({ ...options, cache: "no-store" }),
  }),
);

export async function getCollectionById(id: string, options?: ItemsQuery) {
  return directus.request(readItems(id, options));
}

export async function getItemById(
  collection: string,
  id: number | string,
  options?: ItemsQuery,
) {
  return directus.request(readItem(collection, id, options));
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
  hero_cover: string | {
    filename_disk: string;
    height: number;
    width: number;
  };
  hero_buttons: Array<{
    label: string;
    link: string;
  }>;
  featured_posts: Array<number>;
}

export async function getHome() {
  return getCollectionById("home", {
    fields: [
      '*',
      "hero_cover.filename_disk",
      "hero_cover.height",
      "hero_cover.width",
    ]
  }) as unknown as Home;
}

interface GlobalMetadata {
  id: number;
  tagline: string;
  title: string;
}

export async function getGlobalMetadata() {
  return directus.request(readItems("global")) as unknown as GlobalMetadata;
}
