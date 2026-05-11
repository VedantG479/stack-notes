import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import userDB from "../appwrite/user"
import articleDB from "../appwrite/article"
import formatDate from "../utils/formatDate"
import ArticleList from "../components/ArticleList"

export default function AuthorPage() {
    const { authorId } = useParams()
    const [author, setAuthor] = useState([])
    const [authorArticles, setAuthorArticles] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        userDB.getUser(authorId)
            .then((user) => {
                if (user) setAuthor(user)
            })
        articleDB.getUserArticles(authorId)
            .then((articles) => {
                if (articles) setAuthorArticles(articles.rows)
            })
    }, [authorId])

    return (
        <main className="min-h-screen bg-[#0B0D14] text-[#E7E4DF]">
            <div className="fixed top-0 left-0 w-full bg-[#0B0D14] z-50">
                <div className="max-w-[760px] pl-24 pt-8 pb-4">
                    <button
                        className="text-[12px] text-[#727782] hover:text-[#FF5C8A] transition-colors"
                        onClick={() => navigate(`/`)}>
                        ← Home
                    </button>
                </div>
            </div>

            <div className="max-w-[760px] pl-24 pt-24 pb-24">
                {/* Author Header */}
                <section className="mb-16 mt-4">
                    <h1 className="text-[16px] tracking-[0.03em] mb-4">
                        {author.username}
                    </h1>
                    <p className="text-[13px] leading-[1.8] text-[#727782] max-w-[640px]">
                        {author.intro}
                    </p>
                    <div className="flex items-center gap-8 mt-8 text-[12px] text-[#727782]">
                        {author.github && <a href={author.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#FF5C8A] transition-colors">
                            github
                        </a>}
                        {author.twitter && <a href={author.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-[#FF5C8A] transition-colors">
                            twitter
                        </a>}
                        {author.email && <a href={author.email} target="_blank" rel="noopener noreferrer" className="hover:text-[#FF5C8A] transition-colors">
                            email
                        </a>}
                    </div>
                </section>

                <ArticleList authorArticles={authorArticles}/>

                {/* Footer */}
                <footer className="pt-4 border-t border-[#171B26] text-[12px] text-[#70757E]">
                    <p>Joined on {formatDate(author.$createdAt)}</p>
                </footer>
            </div>
        </main>
    )
}