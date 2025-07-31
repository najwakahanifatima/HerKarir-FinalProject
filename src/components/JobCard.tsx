import { useRouter } from "next/navigation";

export default function JobCard({ job }: { job: any }) {
  const router = useRouter();

  return (
    <div className="border rounded-xl p-4 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold">{job.title}</h3>
        <p className="text-sm text-gray-500">{job.company}</p>

        <div className="flex flex-wrap gap-2 my-3">
          {job.tags.map((tag: string) => (
            <span
              key={tag}
              className="bg-pink-100 text-pink-700 text-xs px-2 py-1 rounded-lg"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-sm flex items-center gap-2">
          📍 {job.location} &nbsp; 💰 Rp {job.salary}
        </p>
        <p className="text-sm">📅 {job.experience}</p>
      </div>

      <button 
        className="mt-4 bg-pink-500 text-white px-3 py-2 rounded-lg"
        onClick={() => {router.push('/job-opportunities/1')}} // TO DO!
      >
        Lihat detail
      </button>
    </div>
  );
}
