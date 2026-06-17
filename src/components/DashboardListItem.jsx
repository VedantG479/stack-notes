import { useNavigate } from "react-router"
import formatDate from "../utils/formatDate"
import { useEffect, useState } from "react"
import articleDB from "../appwrite/article"
import likesDB from "../appwrite/likes"

const statusHandler = async (article, setArticleStatus) => {
    const newStatus = article.status == 'published' ? 'draft' : 'published'
    setArticleStatus(newStatus)
    await articleDB.toggleArticleStatus(article.$id, newStatus)
}

const likeCountFetch = async (articleId) => {
    const likeRecords = await likesDB.getArticleLikeCount(articleId)
    return likeRecords.total
}

export function DashboardListItemBig({article, deleteArticleHandler}) {
    const articleId = article.$id
    const [articleStatus, setArticleStatus] = useState(article.status)
    const [articleLikes, setArticleLikes] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        let count = likeCountFetch(articleId)
        setArticleLikes(count)
    })

    return (
        <div className="grid grid-cols-[4fr_1fr_1fr_1fr_1fr_2fr] h-[82px] border-b border-[#131722] text-[13px]">
            <div className="flex items-center min-w-0 px-8">
                <button className="truncate text-left w-full text-[#FF5C8A] hover:underline underline-offset-4"
                    onClick={() => navigate(`/write/${articleId}`)}>
                    {article.title}
                </button>
            </div>
            <div className="flex items-center justify-center text-[#B5B2AD]">
                {articleStatus}
            </div>
            <div className="flex items-center justify-center text-[#727782]">
                {article.views} 
            </div>
            <div className="flex items-center justify-center text-[#727782]">
                {articleLikes}
            </div>
            <div className="flex items-center justify-center text-[#727782]">
                {formatDate(article.$createdAt)}
            </div>
            <div className="flex items-center justify-center gap-5 text-[#727782]">
                <button className="hover:text-[#FF5C8A] transition-colors"
                    onClick={() => navigate(`/write/${articleId}`)}>
                    edit
                </button>
                <button className="hover:text-[#FF5C8A] transition-colors"
                    onClick={() => statusHandler(article, setArticleStatus)}>
                    {articleStatus == 'published' ? 'unpublish' : 'publish'}
                </button>
                <button className="hover:text-[#FF5C8A] transition-colors"
                    onClick={() => deleteArticleHandler(articleId)}>
                    delete
                </button>
            </div>
        </div>
    )
}

export function DashboardListItemSmall({article, deleteArticleHandler}) {
    const articleId = article.$id
    const [articleStatus, setArticleStatus] = useState(article.status)
    const [articleLikes, setArticleLikes] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        let count = likeCountFetch(articleId)
        setArticleLikes(count)
    })

    return (
        <div className="border-b border-[#171B26] px-5 py-5">
            <button className="text-left text-[15px] leading-relaxed text-[#FF5C8A] hover:underline underline-offset-4"
                onClick={() => navigate(`/write/${articleId}`)}>
                {article.title}
            </button>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-[#727782]">
                <span className="text-[#B5B2AD]">
                    {articleStatus}
                </span>
                <span>
                    {article.views} views
                </span>
                <span>
                    {articleLikes} likes
                </span>
                <span>
                    {formatDate(article.$createdAt)}
                </span>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-5 text-[12px] text-[#727782]">
                <button className="hover:text-[#FF5C8A] transition-colors"
                    onClick={() => navigate(`/write/${articleId}`)}>
                    edit
                </button>
                <button className="hover:text-[#FF5C8A] transition-colors"
                    onClick={() => statusHandler(article, setArticleStatus)}>
                    {articleStatus == 'published' ? 'unpublish' : 'publish'}
                </button>
                <button className="hover:text-[#FF5C8A] transition-colors"
                    onClick={() => deleteArticleHandler(articleId)}>
                    delete
                </button>
            </div>
        </div>
    )
}