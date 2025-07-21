import ReactSwagger from '@/components/react-swagger';
import { getApiDocs } from '@/libs/swagger';

export default async function IndexPage() {
  const spec = await getApiDocs();
  return (
    <section className="container mx-auto">
      <ReactSwagger spec={spec} />
    </section>
  );
}
