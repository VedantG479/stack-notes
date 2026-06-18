import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import userDB from "../appwrite/user"
import { DashboardListItemBig, DashboardListItemSmall } from "../components/DashboardListItem"
import { useLoaderData, useNavigate } from "react-router"
import articleDB from "../appwrite/article"
import likesDB from "../appwrite/likes"

export default function DashboardPage() {
    const { userId } = useSelector(state => state.auth)
    const [user, articlesLoader] = useLoaderData()
    const [articles, setArticles] = useState(articlesLoader)

    const navigate = useNavigate()

    const deleteArticleHandler = useCallback((articleId) => {
        try{
            articleDB.deleteArticle(articleId)
                .then(() => {
                    let newArticles = articles.filter((article) => article.$id !== articleId)
                    setArticles(newArticles)
                    likesDB.deleteArticleLikes(articleId)
                })
        }
        catch(error){
            console.log('error deleting article: ', error)
        }
    }, [articleId, setArticles])

    return (
        <main className="min-h-screen bg-[#0B0D14] text-[#E7E4DF]">
            <div className="w-full px-6 md:px-10 lg:px-24 pt-20 md:pt-28 pb-24">
                {/* Header */}
                <section className="mb-14">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#6C717B]">
                        Dashboard - {user.username}
                    </p>
                </section>

                <div className="hidden lg:block border border-[#171B26] overflow-hidden">
                    {/* Header */}
                    <div className="grid grid-cols-[4fr_1fr_1fr_1fr_1fr_2fr] h-[64px] border-b border-[#171B26] text-[11px] uppercase tracking-[0.18em] text-[#6C717B]">
                        <div className="flex items-center px-8">
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
                    {
                        articles.map((article) => (
                            <DashboardListItemBig key={article.$id} article={article} deleteArticleHandler={deleteArticleHandler}/>
                        ))
                    }
                </div>

                <div className="lg:hidden border border-[#171B26]">
                    {
                        articles.map((article) => (
                            <DashboardListItemSmall key={article.$id} article={article} deleteArticleHandler={deleteArticleHandler}/>
                        ))
                    }
                </div>

                {/* Footer */}
                <footer className="mt-24 pt-8 border-t border-[#171B26] flex items-center gap-8 text-[12px] text-[#70757E]">
                    <button className="hover:text-[#FF5C8A] transition-colors" onClick={() => navigate('/write')}>
                        Write Article
                    </button>
                    <button className="hover:text-[#FF5C8A] transition-colors" onClick={() => navigate('/')}>
                        Home
                    </button>
                </footer>
            </div>
        </main>
    )
}