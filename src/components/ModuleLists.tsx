interface ModuleListProps {
    modulesName: string[];
}

// TO DO: add router and score badge in pre, mid, post test

export const ModuleList = ( { modulesName }: ModuleListProps ) => {
    const middleIndex = modulesName.length / 2;
    const firstPartModules = modulesName.slice(0, middleIndex);
    const lastPartModules = modulesName.slice(middleIndex, modulesName.length)

    return (
        <section className="text-sm">
            <button className="border-[1px] border-[#D9D9D9] rounded-md w-full my-1.5 p-3 mx-3 text-[#C9184A] font-semibold
                hover:bg-[#C9184A] hover:text-white transition cursor-pointer">
                Pre-Test: Menilai Kesiapan Anda      
            </button>
            {firstPartModules.map((title, index) => (
                <button className="border-[1px] border-[#D9D9D9] rounded-md w-full my-1.5 py-2 mx-3
                    hover:bg-[#C9184A] hover:text-white transition cursor-pointer" key={index}>
                    {title}
                </button>
            ))}
            <button className="border-[1px] border-[#D9D9D9] rounded-md w-full my-1.5 py-2 mx-3 text-[#C9184A] font-semibold
                hover:bg-[#C9184A] hover:text-white transition cursor-pointer">
                Mid-Test: Mengukur Hasil Belajar Anda Sejauh Ini    
            </button>
            {lastPartModules.map((title, index) => (
                <button className="border-[1px] border-[#D9D9D9] rounded-md w-full my-1.5 py-2 mx-3
                    hover:bg-[#C9184A] hover:text-white transition cursor-pointer" key={index}>
                    {title}
                </button>
            ))}
            <button className="border-[1px] border-[#D9D9D9] rounded-md w-full my-1.5 py-2 mx-3 text-[#C9184A] font-semibold
                hover:bg-[#C9184A] hover:text-white transition cursor-pointer">
                Post-Test: Menilai Hasil Belajar Anda    
            </button>
        </section>
    )
}