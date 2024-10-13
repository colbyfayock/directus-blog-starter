import Container from "@/components/Container";

const Footer = () => {
  return (
    <footer className="mt-12 mb-8">
      <Container className="flex justify-between gap-4">
        <p className="text-sm">Space Jelly &copy; {new Date().getFullYear()}</p>
        <p className="text-sm">Created by Colby Fayock with Directus</p>
      </Container>
    </footer>
  );
};

export default Footer;
