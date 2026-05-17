import { Client, ID, Query, TablesDB } from "appwrite"
import config from "../config/config"

class UserDatabaseService{
    client = new Client()
    tablesDB 

    constructor(){
        this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId)
        this.tablesDB = new TablesDB(this.client)
    }

    async createUser(id, username, intro, github, twitter, linkedin, email){
        return this.tablesDB.createRow(
            config.appwriteDatabaseId, 
            config.appwriteUsersTableId, 
            id, 
            {
                "username": username, 
                "intro": intro, 
                "github": github, 
                "twitter": twitter, 
                "linkedin": linkedin, 
                "email": email
            }
        )
    }

    async getUser(userId){
        try{
            const user = await this.tablesDB.getRow(
                config.appwriteDatabaseId, 
                config.appwriteUsersTableId, 
                userId
            )
            return user
        }
        catch(error){
            return null
        }
    }

    async getUsers(searchQuery, userId){
        try{
            const queries = [
                Query.contains("username", searchQuery),
            
                Query.orderDesc("number_of_posts"),
                Query.limit(10)
            ]
            if(userId)  queries.push(Query.notContains("$id", userId))

            const results = await this.tablesDB.listRows(
                config.appwriteDatabaseId, 
                config.appwriteUsersTableId, 
                queries
            )
            return results
        }
        catch(error){
            return null
        }
    }

    async updatePostsCount(userId, newPostCount){
        return this.tablesDB.updateRow(
            config.appwriteDatabaseId, 
            config.appwriteUsersTableId, 
            userId, 
            {
                "number_of_posts": newPostCount
            }
        )
    }

    async checkIfArticleLiked(userId, articleId){
        try{
            const user = await this.tablesDB.getRow(
                config.appwriteDatabaseId, 
                config.appwriteUsersTableId, 
                userId
            )
            user.liked_articles.forEach((likedArticle) => {
                if(likedArticle === articleId) return true
            })
            return false
        }
        catch(error){
            return false
        }
    }

    async likeArticle(userId, articleId){
        try{
            const user = await this.getUser(userId)
            if(user){
                const likedArticles = user.liked_articles
                likedArticles.push(articleId)
                await this.tablesDB.updateRow(
                    config.appwriteDatabaseId, 
                    config.appwriteUsersTableId, 
                    userId, 
                    {
                        "liked_articles": likedArticles
                    }
                )
            }
        }
        catch(error){
            throw error
        }
    }

    async unlikeArticle(userId, articleId){
        try{
            const user = await this.getUser(userId)
            if(user){
                const likedArticles = user.liked_articles.filter((article) => article.$id != articleId)
                await this.tablesDB.updateRow(
                    config.appwriteDatabaseId, 
                    config.appwriteUsersTableId, 
                    userId, 
                    {
                        "liked_articles": likedArticles
                    }
                )
            }    
        }
        catch(error){
            throw error
        }
    }
}

const userDB = new UserDatabaseService()
export default userDB