export default function JobDetailCard({ job }: { job: any }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">{job.title}</h1>
        <div className="flex gap-2 my-2 flex-wrap">
          {job.tags.map((tag: string) => (
            <span
              key={tag}
              className="bg-pink-100 text-pink-700 text-sm px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Job Description */}
      <section>
        <h2 className="font-semibold text-lg mb-2">Deskripsi pekerjaan</h2>
        <p className="text-sm text-gray-700 whitespace-pre-line">
          {job.description}
        </p>
      </section>

      {/* Qualifications */}
      <section>
        <h2 className="font-semibold text-lg mb-2">Qualifications</h2>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          {job.qualifications.map((q: string, i: number) => (
            <li key={i}>{q}</li>
          ))}
        </ul>
      </section>

      {/* Experience & Salary */}
      <div className="text-sm mt-2">
        <p>
          <strong>Pengalaman:</strong> {job.experience}
        </p>
        <p>
          <strong>Gaji:</strong> Rp {job.salary}
        </p>
      </div>
    </div>
  );
}
