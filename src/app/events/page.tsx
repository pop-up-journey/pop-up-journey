import EventsPage from '@/_pages/EventsPage';

interface WrapperProps {
  searchParams: Promise<{ zone?: string }>;
}

export default async function Page({ searchParams }: WrapperProps) {
  const sp = await searchParams;
  return <EventsPage searchParams={sp} />;
}
