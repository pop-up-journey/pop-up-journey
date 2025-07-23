import ReactSwagger from '@/components/react-swagger';
import { getApiDocs } from '@/libs/swagger';

export default async function IndexPage() {
  if (process.env.NODE_ENV === 'production') {
    return <div>Not Found</div>;
  }

  const spec = await getApiDocs();
  return (
    <section className="container mx-auto">
      <ReactSwagger spec={spec} />
    </section>
  );
}
