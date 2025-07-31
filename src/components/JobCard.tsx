import { useRouter } from "next/navigation";
import { JobRecommendation } from "@/app/job-opportunities/page";

export default function JobCard({
  title,
  company,
  description,
  qualification,
  benefit,
  similarityScore,
  tags,
  salary,
  experience,
  location,
}: JobRecommendation) {
  const router = useRouter();

  console.log('job card ', company)

  return (
    <div className="border rounded-xl p-4 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        {company && <p className="text-sm text-gray-500">{company}</p>}

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 my-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-pink-100 text-pink-700 text-xs px-2 py-1 rounded-lg"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {(location || salary) && (
          <p className="text-sm flex items-center gap-2">
            {location && <>📍 {location}</>}{" "}
            {salary && <>💰 Rp {salary}</>}
          </p>
        )}

        {experience && <p className="text-sm">📅 {experience}</p>}
      </div>

      <button
        className="mt-4 bg-pink-500 text-white px-3 py-2 rounded-lg"
        onClick={() =>
          router.push(`/job-opportunities/${1}`)
        }
      >
        Lihat detail
      </button>
    </div>
  );
}
