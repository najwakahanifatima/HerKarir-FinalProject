export interface JobFilters {
  minSalary?: string;
  maxSalary?: string;
  jobType?: string[];
  location?: string;
  industry?: string;
}

interface JobFilterProps {
  filters: JobFilters;
  setFilters: React.Dispatch<React.SetStateAction<JobFilters>>;
}

export default function JobFilter({ filters, setFilters }: JobFilterProps) {
  return (
    <div className="border rounded-xl p-4 shadow-md w-64">
      <div className="flex justify-between mb-3">
        <h3 className="font-bold">Filter</h3>
        <button onClick={() => setFilters({})} className="text-sm text-pink-500">
          Clear All
        </button>
      </div>

      <label className="block font-semibold">Expected Salary</label>
      <div className="flex gap-2 mb-4">
        <input
          placeholder="1.000.000"
          className="border p-2 rounded w-24"
          value={filters.minSalary || ""}
          onChange={(e) => setFilters({ ...filters, minSalary: e.target.value })}
        />
        <input
          placeholder="2.500.000"
          className="border p-2 rounded w-24"
          value={filters.maxSalary || ""}
          onChange={(e) => setFilters({ ...filters, maxSalary: e.target.value })}
        />
      </div>

      <label className="block font-semibold">Job Type</label>
      <div className="flex flex-wrap gap-2 mb-4">
        {["Magang", "Penuh waktu", "Paruh waktu", "Freelance"].map((type) => (
          <button
            key={type}
            className={`px-3 py-1 rounded-full text-sm ${
              filters.jobType?.includes(type)
                ? "bg-pink-500 text-white"
                : "bg-gray-100"
            }`}
            onClick={() =>
              setFilters({
                ...filters,
                jobType: filters.jobType?.includes(type)
                  ? filters.jobType.filter((t) => t !== type)
                  : [...(filters.jobType || []), type],
              })
            }
          >
            {type}
          </button>
        ))}
      </div>

      <label className="block font-semibold">Location</label>
      <select
        className="border p-2 rounded mb-4 w-full"
        value={filters.location || ""}
        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
      >
        <option value="">Select location</option>
        <option value="Jakarta">Jakarta</option>
        <option value="Bandung">Bandung</option>
      </select>

      <label className="block font-semibold">Industry</label>
      <select
        className="border p-2 rounded w-full"
        value={filters.industry || ""}
        onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
      >
        <option value="">Select job category</option>
        <option value="Data & Produk">Data & Produk</option>
        <option value="Teknologi">Teknologi</option>
      </select>
    </div>
  );
}
