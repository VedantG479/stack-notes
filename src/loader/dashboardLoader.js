import userDB from "../appwrite/user"
import articleDB from "../appwrite/article"
import store from "../store/store"

async function dashboardLoader({params}){
    const state = store.getState()
    const {userId} = state.auth

    try{
        const [user, articles] = await Promise.all([
            userDB.getUser(userId),
            articleDB.getAllUserArticles(userId)
        ])

        if(!user)   throw new Response('not authorized: ', {status: 404})
        
        return {
            user, 
            articles: articles?.rows
        }
    }
    catch(error){
        throw error
    }
}

export default dashboardLoader