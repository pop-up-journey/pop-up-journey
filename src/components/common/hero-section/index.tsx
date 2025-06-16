interface HeroSectionProps {
  title: string;
  description: string;
}
// HACK: 배경색 + 폰트색 임시로 만듬 만약 필요시 props에서 추가해서 사용가능
export default function HeroSection({ title, description }: HeroSectionProps) {
  return (
    <section aria-label="hero-section">
      <div className="bg-black py-16 text-center text-white">
        <h1 className="mb-2 text-4xl font-bold">{title}</h1>
        <p className="text-lg">{description}</p>
      </div>
    </section>
  );
}
