'use client';

interface PopupDescriptionProps {
  description?: string | null;
}

export default function PopupDescription({ description }: PopupDescriptionProps) {
  return (
    <section className="mb-14">
      <h2 className="mb-2 text-lg font-semibold">이벤트 소개</h2>
      {/* Glassmorphic Card */}
      <div className="relative overflow-hidden rounded-3xl border border-white/30 bg-white/20 p-6 shadow-xl backdrop-blur-lg">
        {/* Glossy Sheen */}
        <div className="pointer-events-none absolute top-0 left-0 h-2 w-full animate-pulse bg-gradient-to-b from-white/50 to-transparent" />
        {/* 실제 본문 */}
        <p className="relative text-sm leading-relaxed text-gray-800">{description}</p>
      </div>
    </section>
  );
}
