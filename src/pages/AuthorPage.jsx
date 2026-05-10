export default function AuthorPage() {
    return (
        <main className="min-h-screen bg-[#0B0D14] text-[#E7E4DF]">
            <div className="max-w-[760px] pl-24 pt-28 pb-24">
                {/* Author Header */}
                <section className="mb-16">
                    <h1 className="text-[16px] tracking-[0.03em] mb-4">
                        Vedant Garg
                    </h1>
                    <p className="text-[13px] leading-[1.8] text-[#727782] max-w-[640px]">
                        Writing about distributed systems, postgres internals,
                        infrastructure engineering, linux environments and the
                        quiet complexity behind scalable software systems.
                    </p>
                    <div className="flex items-center gap-8 mt-8 text-[12px] text-[#727782]">
                        <button className="hover:text-[#FF5C8A] transition-colors">
                            github
                        </button>
                        <button className="hover:text-[#FF5C8A] transition-colors">
                            twitter
                        </button>
                        <button className="hover:text-[#FF5C8A] transition-colors">
                            mail
                        </button>
                    </div>
                </section>

                {/* 2026 */}
                <section className="mb-16">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#6C717B] mb-8 underline underline-offset-6">
                        2026
                    </p>
                    <div className="space-y-5">
                        <button className="block text-left text-[14px] leading-[1.7] text-[#FF5C8A] hover:underline underline-offset-4">
                            Backing up with restic in append-only mode on rsync.net
                        </button>
                        <button className="block text-left text-[14px] leading-[1.7] text-[#FF5C8A] hover:underline underline-offset-4">
                            Deploying with SSH
                        </button>
                        <button className="block text-left text-[14px] leading-[1.7] text-[#FF5C8A] hover:underline underline-offset-4">
                            Disabling Google&apos;s AI Overview
                        </button>
                        <button className="block text-left text-[14px] leading-[1.7] text-[#FF5C8A] hover:underline underline-offset-4">
                            Building infrastructure that survives failure
                        </button>
                    </div>
                </section>

                {/* 2025 */}
                <section className="mb-16">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#6C717B] mb-8 underline underline-offset-6">
                        2025
                    </p>
                    <div className="space-y-5">
                        <button className="block text-left text-[14px] leading-[1.7] text-[#FF5C8A] hover:underline underline-offset-4">
                            Why postgres indexing still matters
                        </button>
                        <button className="block text-left text-[14px] leading-[1.7] text-[#FF5C8A] hover:underline underline-offset-4">
                            Understanding repeatable reads properly
                        </button>
                        <button className="block text-left text-[14px] leading-[1.7] text-[#FF5C8A] hover:underline underline-offset-4">
                            Practical caching with redis
                        </button>
                    </div>
                </section>

                {/* Footer */}
                <footer className="pt-8 border-t border-[#171B26] flex items-center gap-8 text-[12px] text-[#70757E]">
                    <button className="hover:text-[#FF5C8A] transition-colors">
                        Home
                    </button>
                    <button className="hover:text-[#FF5C8A] transition-colors">
                        Contact
                    </button>
                </footer>
            </div>
        </main>
    )
}