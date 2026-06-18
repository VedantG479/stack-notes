import { useCallback } from "react"
import { useNavigate } from "react-router"

export default function ArticleList({ authorArticles }) {
    const navigate = useNavigate()

    const openArticle = useCallback((articleId) => {
        navigate(`/${articleId}`)
    }, [articleId])

    function generateList() {
        let currentYear = null
        const elements = []

        authorArticles.forEach((article) => {
            const year = article.$updatedAt.slice(0, 4)
            if(year !== currentYear){
                currentYear = year
                elements.push(
                    <p
                        key={`year-${year}`}
                        className="text-[11px] uppercase tracking-[0.18em] text-[#6C717B] mb-8 underline underline-offset-6 mt-10">
                        {year}
                    </p>
                )
            }
            elements.push(
                <button
                    key={article.$id}
                    className="block text-left text-[14px] leading-[1.7] text-[#FF5C8A] hover:underline underline-offset-4"
                    onClick={() => openArticle(article.$id)}>
                    {article.title}
                </button>
            )
        })

        return elements
    }

    return (
        !authorArticles || authorArticles.length === 0 ? (
            <section className="py-24">
                <h2 className="text-[24px] leading-none font-bold tracking-[-0.05em] text-[#E7E4DF]">
                    no articles
                </h2>
                <p className="text-[14px] text-[#727782] mt-3 leading-[1.8]">
                    this author hasn’t published anything yet.
                </p>
            </section>
        ) : (
            <section className="mb-16 space-y-5">
                {generateList()}
            </section>
        )
    )
}