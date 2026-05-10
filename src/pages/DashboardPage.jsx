export default function DashboardPage() {
    return (
        <main className="min-h-screen bg-[#0B0D14] text-[#E7E4DF]">
            <div className="max-w-[1400px] pl-24 pr-24 pt-28 pb-24">
                {/* Header */}
                <section className="mb-16">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#6C717B] mb-5">
                        Dashboard
                    </p>
                    <h1 className="text-[15px] tracking-[0.03em] text-[#C8C4BE]">
                        Vedant Garg
                    </h1>
                </section>

                {/* Table */}
                <div className="border border-[#171B26]">
                    {/* Header */}
                    <div
                        className="
                            grid
                            grid-cols-[500px_120px_100px_100px_120px_260px]
                            h-[64px]
                            border-b
                            border-[#171B26]
                            text-[11px]
                            uppercase
                            tracking-[0.18em]
                            text-[#6C717B]">
                        <div className="flex items-center px-6">
                            Title
                        </div>
                        <div className="flex items-center justify-center">
                            Status
                        </div>
                        <div className="flex items-center justify-center">
                            Views
                        </div>
                        <div className="flex items-center justify-center">
                            Likes
                        </div>
                        <div className="flex items-center justify-center">
                            Date
                        </div>
                        <div className="flex items-center justify-center">
                            Actions
                        </div>
                    </div>

                    {/* Row */}
                    <div
                        className="
                            grid
                            grid-cols-[500px_120px_100px_100px_120px_260px]
                            h-[82px]
                            border-b
                            border-[#131722]
                            text-[13px]">
                        <div className="flex items-center px-6 overflow-hidden">
                            <button
                                className="
                                    text-left
                                    text-[#FF5C8A]
                                    hover:underline
                                    underline-offset-4
                                    whitespace-nowrap
                                    overflow-hidden
                                    text-ellipsis">
                                Backing up with restic in append-only mode
                            </button>
                        </div>
                        <div className="flex items-center justify-center whitespace-nowrap text-[#B5B2AD]">
                            Published
                        </div>
                        <div className="flex items-center justify-center whitespace-nowrap text-[#727782]">
                            12.4k
                        </div>
                        <div className="flex items-center justify-center whitespace-nowrap text-[#727782]">
                            4.1k
                        </div>
                        <div className="flex items-center justify-center whitespace-nowrap text-[#727782]">
                            May 10
                        </div>
                        <div className="flex items-center justify-center gap-5 whitespace-nowrap text-[#727782]">
                            <button className="hover:text-[#FF5C8A] transition-colors">
                                edit
                            </button>
                            <button className="hover:text-[#FF5C8A] transition-colors">
                                unpublish
                            </button>
                            <button className="hover:text-[#FF5C8A] transition-colors">
                                delete
                            </button>
                        </div>
                    </div>

                    {/* Row */}
                    <div
                        className="
                            grid
                            grid-cols-[500px_120px_100px_100px_120px_260px]
                            h-[82px]
                            border-b
                            border-[#131722]
                            text-[13px]">
                        <div className="flex items-center px-6 overflow-hidden">
                            <button
                                className="
                                    text-left
                                    text-[#FF5C8A]
                                    hover:underline
                                    underline-offset-4
                                    whitespace-nowrap
                                    overflow-hidden
                                    text-ellipsis">
                                Deploying with SSH
                            </button>
                        </div>
                        <div className="flex items-center justify-center whitespace-nowrap text-[#B5B2AD]">
                            Draft
                        </div>
                        <div className="flex items-center justify-center whitespace-nowrap text-[#727782]">
                            —
                        </div>
                        <div className="flex items-center justify-center whitespace-nowrap text-[#727782]">
                            —
                        </div>
                        <div className="flex items-center justify-center whitespace-nowrap text-[#727782]">
                            Apr 28
                        </div>
                        <div className="flex items-center justify-center gap-5 whitespace-nowrap text-[#727782]">
                            <button className="hover:text-[#FF5C8A] transition-colors">
                                edit
                            </button>
                            <button className="hover:text-[#FF5C8A] transition-colors">
                                publish
                            </button>
                            <button className="hover:text-[#FF5C8A] transition-colors">
                                delete
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-24 pt-8 border-t border-[#171B26] flex items-center gap-8 text-[12px] text-[#70757E]">
                    <button className="hover:text-[#FF5C8A] transition-colors">
                        Write Article
                    </button>
                    <button className="hover:text-[#FF5C8A] transition-colors">
                        Home
                    </button>
                </footer>
            </div>
        </main>
    )
}