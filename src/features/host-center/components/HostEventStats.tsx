export default function HostEventStats({
  ongoing,
  ended,
  upcoming,
}: {
  ongoing: number;
  ended: number;
  upcoming: number;
}) {
  return (
    <section id="defaultSt" className="mx-auto mt-8 grid max-w-5xl grid-cols-3 gap-6">
      <div className="rounded-lg bg-gray-50 p-6">
        <div className="mb-2 text-sm text-gray-500">운영중인 팝업</div>
        <div className="text-2xl font-bold">{ongoing}</div>
      </div>
      <div className="rounded-lg bg-gray-50 p-6">
        <div className="mb-2 text-sm text-gray-500">종료된 팝업</div>
        <div className="text-2xl font-bold">{ended}</div>
      </div>
      <div className="rounded-lg bg-gray-50 p-6">
        <div className="mb-2 text-sm text-gray-500">예정된 팝업</div>
        <div className="text-2xl font-bold">{upcoming}</div>
      </div>
    </section>
  );
}
