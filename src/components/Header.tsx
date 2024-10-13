import Container from "@/components/Container";
import { getCollectionById, getGlobalMetadata } from "@/lib/directus";
import Link from "next/link";

async function Header() {
  const { title } = await getGlobalMetadata();
  return (
    <header className="bg-slate-50 py-8">
      <Container>
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <p className="font-bold">
              <Link href="/">{ title }</Link>
            </p>
          </div>
          <div>
            asdf
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
