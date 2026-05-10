export default function WriteArticlePage() {
    return (
        <main className="min-h-screen bg-[#0B0D14] text-[#E7E4DF]">
            <div className="max-w-[860px] pl-24 pt-28 pb-24">
                {/* Header */}
                <section className="mb-20">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#6C717B] mb-5">
                        Write Article
                    </p>
                    <input
                        type="text"
                        placeholder="Article title..."
                        className="
                            w-full
                            bg-transparent
                            border-none
                            outline-none
                            text-[28px]
                            leading-[1.5]
                            tracking-[-0.03em]
                            placeholder:text-[#4F5563]
                        "
                    />
                </section>

                {/* Meta */}
                <section className="mb-16 flex items-center gap-10 text-[13px] text-[#727782]">
                    <select
                        className="
                            bg-transparent
                            border-none
                            outline-none
                            text-[#B6B2AC]
                            cursor-pointer">
                        <option>C++</option>
                        <option>Java</option>
                        <option>Distributed Systems</option>
                        <option>Databases</option>
                    </select>
                    <select
                        className="
                            bg-transparent
                            border-none
                            outline-none
                            text-[#B6B2AC]
                            cursor-pointer">
                        <option>Draft</option>
                        <option>Published</option>
                    </select>
                </section>

                {/* Editor */}
                <section className="mb-24">
                    <div
                        className="
                            min-h-[500px]
                            text-[14px]
                            leading-[2]
                            text-[#C9C6C1]
                            outline-none"
                        contentEditable
                        suppressContentEditableWarning>
                        <p>
                            Start writing here...
                        </p>
                    </div>
                </section>

                {/* Actions */}
                <section className="flex items-center gap-10 text-[13px] text-[#727782]">
                    <button className="hover:text-[#FF5C8A] transition-colors">
                        publish
                    </button>
                    <button className="hover:text-[#FF5C8A] transition-colors">
                        save draft
                    </button>
                    <button className="hover:text-[#FF5C8A] transition-colors">
                        cancel
                    </button>
                </section>
            </div>
        </main>
    )
}