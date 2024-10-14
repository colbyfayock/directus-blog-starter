import Image from "next/image";

import { getCourses } from "@/lib/courses";

import Container from "@/components/Container";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const courses = await getCourses({
    fields: ["cover.filename_disk", "cover.height", "cover.width", "link", "slug", "title"],
  });

  console.log('courses', courses)

  return (
    <>
      <section className="bg-slate-50">
        <Container className="-mt-8 py-28">
          <header className="text-center mx-auto mb-24">
            <h1 className="text-5xl leading-none mb-4">Courses</h1>
          </header>
          <ul className="grid grid-cols-2 gap-x-10 gap-y-16">
            {courses.map((course) => {
              return (
                <li key={course.slug} className="space-y-4">
                  {typeof course.cover === 'object' && (
                    <a href={course.link}>
                      <Image
                        className="block rounded-lg"
                        width={course.cover.width}
                        height={course.cover.height}
                        src={`${process.env.NEXT_PUBLIC_DIRECTUS_API_ENDPOINT}/assets/${course.cover.filename_disk}`}
                        alt=""
                        sizes="50vw"
                      />
                    </a>
                  )}
                  <h3 className="text-lg font-semibold leading-tight">
                    <a href={course.link}>{course.title}</a>
                  </h3>
                  <p>
                    <Button asChild className="font-bold">
                      <a href={course.link}>Get Started</a>
                    </Button>
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
