import { useSelector } from "react-redux"
import userDB from "../appwrite/user"
import articleDB from "../appwrite/article"

async function dashboardLoader({params}){
    const userId = useSelector(state => state.auth)

    try{
        const [user, articles] = await Promise.all([
            userDB.getUser(userId),
            articleDB.getAllUserArticles(userId)
        ])

        if(!user)   throw new Response('not authorized: ', {status: 404})
        
        return {
            user, 
            articlesLoader: articles
        }
    }
    catch(error){
        throw error
    }
}

export default dashboardLoader