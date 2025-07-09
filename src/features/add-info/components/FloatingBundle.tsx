import FloatingShape from '@/components/common/floating';

export default function FloatingBundle() {
  return (
    <>
      <FloatingShape color="bg-yellow-500" size="w-64 h-64" top="40%" left="50%" delay={0} />
      <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="70%" left="60%" delay={5} />
      <FloatingShape color="bg-lime-500" size="w-32 h-32" top="60%" left="10%" delay={2} />
    </>
  );
}
