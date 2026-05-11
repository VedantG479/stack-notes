import { useNavigate } from "react-router"

export default function Author({ author }) {
    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-between mb-5">
            <button className="text-[14px] tracking-[0.03em] hover:text-[#FF5C8A] transition-colors"
                onClick={() => navigate(`/author/${author.$id}`)}>
                {author.username}
            </button>
            <div className="flex items-center gap-8 text-[12px] text-[#70757E]">
                <span>
                    {author.number_of_posts} posts
                </span>
                <span>
                    {author.total_likes} likes
                </span>
            </div>
        </div>
    )
}