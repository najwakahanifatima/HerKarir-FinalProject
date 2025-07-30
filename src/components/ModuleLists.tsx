interface ModuleListProps {
    modulesName: string[];
}

// TO DO: add router and score badge in pre, mid, post test

export const ModuleList = ( { modulesName }: ModuleListProps ) => {
    if (!modulesName || modulesName.length === 0) {
        return <p>No modules available</p>;
    }
    const middleIndex = modulesName.length / 2;
    const firstPartModules = modulesName.slice(0, middleIndex);
    const lastPartModules = modulesName.slice(middleIndex, modulesName.length)

    return (
        <section className="text-sm">
            <button className="border-[1px] border-[#D9D9D9] rounded-lg w-full my-1.5 p-5 text-[#C9184A] font-semibold
                hover:bg-[#C9184A] hover:text-white transition cursor-pointer text-left">
                Pre-Test: Menilai Kesiapan Anda      
            </button>
            {firstPartModules.map((title, index) => (
                <button className="border-[1px] border-[#D9D9D9] rounded-lg w-full my-1.5 p-5
                    hover:bg-[#C9184A] hover:text-white transition cursor-pointer text-left" key={index}>
                    {title}
                </button>
            ))}
            <button className="border-[1px] border-[#D9D9D9] rounded-lg w-full my-1.5 p-5 text-[#C9184A] font-semibold
                hover:bg-[#C9184A] hover:text-white transition cursor-pointer text-left">
                Mid-Test: Mengukur Hasil Belajar Anda Sejauh Ini    
            </button>
            {lastPartModules.map((title, index) => (
                <button className="border-[1px] border-[#D9D9D9] rounded-lg w-full my-1.5 p-5
                    hover:bg-[#C9184A] hover:text-white transition cursor-pointer text-left" key={index}>
                    {title}
                </button>
            ))}
            <button className="border-[1px] border-[#D9D9D9] rounded-lg w-full my-1.5 p-5 text-[#C9184A] font-semibold
                hover:bg-[#C9184A] hover:text-white transition cursor-pointer text-left">
                Post-Test: Menilai Hasil Belajar Anda    
            </button>
        </section>
    )
}