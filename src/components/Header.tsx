import Link from "next/link";
import { Github } from "lucide-react";

import { getGlobalMetadata } from "@/lib/directus";
import { getPages } from "@/lib/pages";

import Container from "@/components/Container";

async function Header() {
  const { title } = await getGlobalMetadata();
  const pages = (await getPages({ fields: ['title', 'slug', 'navigation'] })).filter(({ navigation }) => navigation === 'yes');
  return (
    <header className="bg-slate-50 py-8">
      <Container>
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <p className="font-bold">
              <Link href="/">{ title }</Link>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <ul>
              {pages.map(({ title, slug }) => {
                return (
                  <li key={slug}>
                    <Link href={`/${slug}`}>{ title }</Link>
                  </li>
                )
              })}
            </ul>
            <span>/</span>
            <ul>
              <li>
                <a href="https://github.com/colbyfayock/test-directus-blog">
                  <Github className="w-4 h-auto" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
