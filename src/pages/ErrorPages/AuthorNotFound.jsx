import { useNavigate } from "react-router"

export default function AuthorNotFound(){
    const navigate = useNavigate()
    
    return (
        <main className="min-h-screen bg-[#0B0D14] text-[#E7E4DF]">
            <div className="max-w-[860px] pl-24 pt-28 pb-24">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#6C717B] mb-8">
                    Error 404
                </p>

                <h1 className="text-[42px] leading-[1.1] tracking-[-0.04em] mb-6">
                    Author not found
                </h1>

                <p className="text-[15px] leading-[2] text-[#727782] max-w-[500px] mb-16">
                    The author you are looking for either does not exist,
                    has been deleted, or you do not have permission to view it.
                </p>

                <button
                    onClick={() => navigate(-1)}
                    className="
                        text-[13px]
                        text-[#727782]
                        hover:text-[#FF5C8A]
                        transition-colors
                    ">
                    ← go back
                </button>
            </div>
        </main>
    )
}