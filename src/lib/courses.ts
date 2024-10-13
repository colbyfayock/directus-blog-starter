import { readItem, readItems } from "@directus/sdk";

import { type ItemsQuery, directus } from "@/lib/directus";

export interface Course {
  cover?: string;
  date_created?: string;
  link?: string;
  slug?: string;
  title?: string;
}

export async function getCourses(options?: ItemsQuery): Promise<Array<Course>> {
  return directus.request(readItems("courses", options));
}

export async function getCourseBySlug(
  slug: Course["slug"],
  options?: ItemsQuery,
): Promise<Course> {
  if (!slug) throw new Error("Invalid slug");
  return directus.request(readItem("courses", slug, options));
}
