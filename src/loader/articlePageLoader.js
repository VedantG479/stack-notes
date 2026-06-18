import articleDB from "../appwrite/article"
import likesDB from "../appwrite/likes"
import userDB from "../appwrite/user"
import store from "../store/store"

async function articlePageLoader({params}){
    const {articleId} = params
    const state = store.getState()
    const { isAuthenticated, userId } = state.auth
    let articleAlreadyLiked = false

    try{
        const article = await articleDB.getArticle(articleId)
        if(!article){
            throw new Response('article not found', {status: 404})
        }

        const viewedArticle = localStorage.getItem(articleId)
        if(!viewedArticle){
            localStorage.setItem(articleId, true)
            articleDB.updateViewCountArticle(articleId, article.views + 1)
        }

        let likeCount = await likesDB.getArticleLikeCount(articleId)
        likeCount = likeCount.total
        
        if(isAuthenticated){
            articleAlreadyLiked = await likesDB.getLikeRecord(userId, articleId)
            articleAlreadyLiked = articleAlreadyLiked.total != 0
        } 

        const author = await userDB.getUser(article.authorId)

        return {
            articleId, 
            article, 
            author, 
            articleAlreadyLiked, 
            likeCount
        }
    }
    catch(error){
        console.log('article not found: ', error)
        throw error
    }
}

export default articlePageLoader