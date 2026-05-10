export default function ArticlePage() {
    return (
        <main className="min-h-screen bg-[#0B0D14] text-[#E7E4DF]">
            <div className="max-w-[760px] pl-24 pt-28 pb-32">
                {/* Back */}
                <button className="text-[12px] text-[#727782] hover:text-[#FF5C8A] transition-colors mb-16">
                    ← back
                </button>

                {/* Header */}
                <header className="mb-24">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#6C717B] mb-5">
                        Distributed Systems • 10 May 2026
                    </p>
                    <h1 className="text-[24px] leading-[1.45] tracking-[-0.02em] max-w-[700px]">
                        Designing websocket infrastructure that survives scale
                    </h1>
                    <div className="flex items-center gap-6 mt-8 text-[12px] text-[#727782]">
                        <button className="hover:text-[#FF5C8A] transition-colors">
                            Vedant Garg
                        </button>
                        <span>
                            4.2k likes
                        </span>
                    </div>
                </header>

                {/* Content */}
                <article className="space-y-10 text-[14px] leading-[2] text-[#C8C5C0]">

                    <p>
                        Most websocket systems fail silently long before they
                        technically go down. Connections remain open, servers
                        continue responding, yet latency slowly increases until
                        the entire experience becomes unreliable for users.
                    </p>
                </article>

                {/* Footer */}
                <footer className="mt-32 pt-8 border-t border-[#171B26] flex items-center gap-8 text-[12px] text-[#70757E]">
                    <button className="hover:text-[#FF5C8A] transition-colors">
                        Home
                    </button>
                    <button className="hover:text-[#FF5C8A] transition-colors">
                        Like
                    </button>
                    <button className="hover:text-[#FF5C8A] transition-colors">
                        More from Andre
                    </button>
                </footer>
            </div>
        </main>
    )
}