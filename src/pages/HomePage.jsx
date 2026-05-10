export default function HomePage() {
    return (
        <main className="min-h-screen bg-[#0B0D14] text-[#E7E4DF]">
            <div className="max-w-[760px] pl-24 pt-28 pb-24">
                {/* Topics */}
                <section className="mb-24">
                    <p className="text-[11px] tracking-[0.18em] uppercase text-[#6C717B] mb-6">Topics</p>
                    <div className="flex flex-wrap gap-x-5 gap-y-3 text-[13px] leading-none">
                        <button className="text-[#FF5C8A]">C++</button>
                        <button className="text-[#B6B2AC] hover:text-[#FF5C8A] transition-colors">Java</button>
                        <button className="text-[#B6B2AC] hover:text-[#FF5C8A] transition-colors">Distributed Systems</button>
                        <button className="text-[#B6B2AC] hover:text-[#FF5C8A] transition-colors">Networking</button>
                        <button className="text-[#B6B2AC] hover:text-[#FF5C8A] transition-colors">Linux</button>
                        <button className="text-[#B6B2AC] hover:text-[#FF5C8A] transition-colors">Databases</button>
                        <button className="text-[#B6B2AC] hover:text-[#FF5C8A] transition-colors">JVM</button>
                        <button className="text-[#B6B2AC] hover:text-[#FF5C8A] transition-colors">Concurrency</button>
                    </div>
                </section>

                {/* Authors */}
                <section className="space-y-20">
                    {/* Author */}
                    <div className="flex items-center justify-between mb-5">
                        <button className="text-[14px] tracking-[0.03em] hover:text-[#FF5C8A] transition-colors">
                            Andre Azzolini
                        </button>
                        <div className="flex items-center gap-8 text-[12px] text-[#70757E]">
                            <span>
                                24 posts
                            </span>
                            <span>
                                18.4k likes
                            </span>
                        </div>
                    </div>
                    {/* Author */}
                    <div className="flex items-center justify-between mb-5">
                        <button className="text-[14px] tracking-[0.03em] hover:text-[#FF5C8A] transition-colors">
                            Andre Azzolini
                        </button>
                        <div className="flex items-center gap-8 text-[12px] text-[#70757E]">
                            <span>
                                24 posts
                            </span>
                            <span>
                                18.4k likes
                            </span>
                        </div>
                    </div>
                    {/* Author */}
                    <div className="flex items-center justify-between mb-5">
                        <button className="text-[14px] tracking-[0.03em] hover:text-[#FF5C8A] transition-colors">
                            Andre Azzolini
                        </button>
                        <div className="flex items-center gap-8 text-[12px] text-[#70757E]">
                            <span>
                                24 posts
                            </span>
                            <span>
                                18.4k likes
                            </span>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="mt-32 pt-8 border-t border-[#171B26] flex items-center gap-8 text-[12px] text-[#70757E]">
                    <button className="hover:text-[#FF5C8A] transition-colors">
                        Become an Author
                    </button>
                    <button className="hover:text-[#FF5C8A] transition-colors">
                        Contact Us
                    </button>
                </footer>
            </div>
        </main>
    )
}

// Article Page WriteArticle Page DashBoard Page