export default function SearchAuthor({searchQuery, setSearchQuery}) {
    return (
        <section className="mb-24 max-w-[520px]">
            <p className="text-[11px] tracking-[0.18em] uppercase text-[#6C717B] mb-6">
                Search Authors
            </p>

            <div className="border-b border-[#171B26] pb-4 flex items-center">
                <input
                    type="text"
                    placeholder="search by author..."
                    className="w-full bg-transparent border-none outline-none text-[14px] text-[#E7E4DF] placeholder:text-[#4D5462]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}/>
            </div>
        </section>
    )
}