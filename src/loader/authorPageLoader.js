import articleDB from "../appwrite/article"
import userDB from "../appwrite/user"

async function authorPageLoader({params}){
    const { authorId } = params

    try{
        const [author, articlesData] = await Promise.all([
            userDB.getUser(authorId),
            articleDB.getUserArticles(authorId)
        ])

        if(!author){
            throw new Response("author not found, ", {status: 404})
        }

        return {
            author, 
            articles: articlesData?.rows || []
        }
    }
    catch(error){
        console.log('error loading author: ', error)
        throw error
    }
}

export default authorPageLoader