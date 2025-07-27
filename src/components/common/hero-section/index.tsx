interface HeroSectionProps {
  title: string;
  description: string;
}
export default function HeroSection({ title, description }: HeroSectionProps) {
  return (
    <section aria-label="hero-section">
      <div className="bg-gradient-to-t from-[#ffc0d4] py-16 text-center text-white">
        <h1 className="mb-2 text-4xl font-bold">{title}</h1>
        <p className="text-lg">{description}</p>
      </div>
    </section>
  );
}
