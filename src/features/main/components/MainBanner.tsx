export default function MainBanner() {
  return (
    // HACK : GSAP 애니메이션 적용 예정
    <section className="relative mb-10 flex h-[60vh] items-center justify-center bg-cover bg-center text-white">
      <div className="px-4 text-center">
        <h1 className="mb-4 text-4xl font-bold">지금 떠오르는 팝업, 한눈에 보기</h1>
        <p className="mb-6 text-lg">가장 인기 있는 팝업을 간편하게 찾아보세요</p>
        <button className="rounded-full bg-white px-6 py-2 font-semibold text-black transition hover:bg-gray-100">
          팝업스토어 둘러보기
        </button>
      </div>
    </section>
  );
}
