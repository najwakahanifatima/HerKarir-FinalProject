export default function JobRecommendationCard({ job }: { job: any }) {
  return (
    <div className="border p-4 rounded-xl shadow-sm flex flex-col justify-between">
      <h3 className="text-sm font-bold">{job.title}</h3>
      <p className="text-xs text-gray-500">{job.company}</p>
      <div className="flex flex-wrap gap-1 my-2">
        {job.tags.map((tag: string) => (
          <span
            key={tag}
            className="bg-pink-100 text-pink-700 text-[10px] px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="text-xs">📍 {job.location}</p>
      <p className="text-xs">💰 Rp {job.salary}</p>
      <p className="text-xs">{job.experience}</p>
      <button className="mt-3 bg-pink-500 text-white text-sm px-3 py-1 rounded">
        Lihat detail
      </button>
    </div>
  );
}
