import { useCallback, useState } from "react"
import { useLoaderData, useNavigate } from "react-router"
import formatDate from "../utils/formatDate"
import { useSelector } from "react-redux"
import renderEditorContent from "../utils/renderEditorContent"
import likesDB from "../appwrite/likes"
import { debounce } from "../utils/debounce"

export default function ArticlePage() {
    const { articleId, article, author, articleAlreadyLiked, likeCount } = useLoaderData()
    const [articleLiked, setArticleLiked] = useState(articleAlreadyLiked)
    const [likes, setLikes] = useState(likeCount)

    const { isAuthenticated, userId } = useSelector(state => state.auth)
    const navigate = useNavigate()

    const syncLikeWithDB = debounce(async (isLiked) => {
        try {
            if (isLiked) await likesDB.likeArticle(userId, articleId)
            else await likesDB.unLikeArticle(userId, articleId)
        }
        catch (error) {
            console.log(`error ${isLiked ? 'unliking' : 'liking'} post: `, error)
        }
    })

    const toggleLikeArticleHandler = useCallback(() => {
        const nextLikedState = !articleLiked
        setArticleLiked(nextLikedState)
        setLikes(prev => nextLikedState ? prev + 1 : prev - 1)
        syncLikeWithDB(nextLikedState)
    }, [setArticleLiked, setLikes])

    return (
        <main className="min-h-screen bg-[#0B0D14] text-[#E7E4DF]">
            <div className="max-w-[760px] pl-24 pt-28 pb-32">
                <button className="text-[12px] text-[#727782] hover:text-[#FF5C8A] transition-colors mb-16"
                    onClick={() => navigate(`/author/${author.$id}`)}>
                    ← back
                </button>

                <header className="mb-24">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#6C717B] mb-5">
                        {article.topic} • {formatDate(article.$updatedAt)}
                    </p>
                    <h1 className="text-[24px] leading-[1.45] tracking-[-0.02em] max-w-[700px]">
                        {article.title}
                    </h1>
                    <div className="flex items-center gap-6 mt-8 text-[12px] text-[#727782]">
                        <button className="hover:text-[#FF5C8A] transition-colors">
                            {author.username}
                        </button>
                        <span>
                            {article.views} views
                        </span>
                        <span>
                            {likes} likes
                        </span>
                    </div>
                </header>

                <article className="space-y-10 text-[14px] leading-[2] text-[#C8C5C0]">
                    <section
                        className="prose prose-invert max-w-none text-[#D3D0CB]"
                        dangerouslySetInnerHTML={{
                            __html: renderEditorContent(article.content)
                        }}
                    />
                </article>

                <footer className="mt-32 pt-8 border-t border-[#171B26] flex items-center gap-8 text-[12px] text-[#70757E]">
                    <button className="hover:text-[#FF5C8A] transition-colors"
                        onClick={() => navigate('/')}>
                        Home
                    </button>
                    {isAuthenticated ?
                        <button className="hover:text-[#FF5C8A] transition-colors"
                            onClick={toggleLikeArticleHandler}>
                            {!articleAlreadyLiked ? 'Like' : 'UnLike'}
                        </button> :
                        <button className="hover:text-[#FF5C8A] transition-colors"
                            onClick={() => navigate('/login', {
                                state: { from: location.pathname }
                            }
                            )}>
                            Login to Like
                        </button>}
                    <button className="hover:text-[#FF5C8A] transition-colors"
                        onClick={() => navigate(`/author/${author.$id}`)}>
                        More from {author.username}
                    </button>
                </footer>
            </div>
        </main>
    )
}