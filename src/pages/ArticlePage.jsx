import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import articleDB from "../appwrite/article"
import formatDate from "../utils/formatDate"
import userDB from "../appwrite/user"
import { useSelector } from "react-redux"
import renderEditorContent from "../utils/renderEditorContent"
import { likesDB } from "../appwrite/likes"
import { debounce } from "../utils/debounce"

export default function ArticlePage() {
    const { articleId } = useParams()
    const [articleFound, setArticleFound] = useState(true)
    const [article, setArticle] = useState([])
    const [author, setAuthor] = useState([])
    const [articleAlreadyLiked, setArticleAlreadyLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(0)
    const { isAuthenticated, userId } = useSelector(state => state.auth)

    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            const tempArticle = await articleDB.getArticle(articleId)
            if(!tempArticle){
                setArticleFound(false)
                return
            }
            setArticle(tempArticle)

            const tempArticleLikeCount = await likesDB.getArticleLikeCount(articleId)
            setLikeCount(tempArticleLikeCount.total)
            
            if (isAuthenticated) {
                const isArticleLiked = await likesDB.getLikeRecord(userId, articleId)
                setArticleAlreadyLiked(isArticleLiked.total != 0)
                await articleDB.updateViewCountArticle(articleId, tempArticle.views + 1)
            }

            const tempAuthor = await userDB.getUser(tempArticle.authorId)
            if (tempAuthor) setAuthor(tempAuthor)
        }
        fetchData()
    }, [articleId])

    const syncLikeWithDB = useCallback(
        debounce(async(isLiked) => {
            try{
                if (isLiked)    await likesDB.likeArticle(userId, articleId)
                else    await likesDB.unLikeArticle(userId, articleId)
            }
            catch(error){
                console.log(`error ${isLiked ? 'unliking' : 'liking'} post: `, error)
            }
        })
    , [])

    const toggleLikeArticleHandler = () => {
        const nextLikedState = !articleAlreadyLiked
        setArticleAlreadyLiked(nextLikedState)
        setLikeCount(prev => nextLikedState ? prev + 1 : prev - 1)
        syncLikeWithDB(nextLikedState)
    }

    return articleFound ? (
        <main className="min-h-screen bg-[#0B0D14] text-[#E7E4DF]">
            <div className="max-w-[760px] pl-24 pt-28 pb-32">
                {/* Back */}
                <button className="text-[12px] text-[#727782] hover:text-[#FF5C8A] transition-colors mb-16"
                    onClick={() => navigate(`/author/${author.$id}`)}>
                    ← back
                </button>

                {/* Header */}
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
                            {article.views + 1} views
                        </span>
                        <span>
                            {likeCount} likes
                        </span>
                    </div>
                </header>

                {/* Content */}
                <article className="space-y-10 text-[14px] leading-[2] text-[#C8C5C0]">
                    <section
                        className="prose prose-invert max-w-none text-[#D3D0CB]"
                        dangerouslySetInnerHTML={{
                            __html: renderEditorContent(article.content)
                        }}
                    />
                </article>

                {/* Footer */}
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
    ) : (
        <main className="min-h-screen bg-[#0B0D14] text-[#E7E4DF]">
            <div className="max-w-[860px] pl-24 pt-28 pb-24">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#6C717B] mb-8">
                    Error 404
                </p>

                <h1 className="text-[42px] leading-[1.1] tracking-[-0.04em] mb-6">
                    Article not found
                </h1>

                <p className="text-[15px] leading-[2] text-[#727782] max-w-[500px] mb-16">
                    The article you are looking for either does not exist,
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