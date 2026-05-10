import { Client, ID, Query, TablesDB } from "appwrite"
import config from "../config/config"

class UserDatabaseService{
    client = new Client()
    tablesDB 

    constructor(){
        this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId)
        this.tablesDB = new TablesDB(this.client)
    }

    async createUser(username, intro, github, twitter, linkedin, email){
        return this.tablesDB.createRow(
            config.appwriteDatabaseId, 
            config.appwriteUsersTableId, 
            ID.unique(), 
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

    async getUsers(searchQuery = ""){
        try{
            const results = await this.tablesDB.listRows(
                config.appwriteDatabaseId, 
                config.appwriteUsersTableId, 
                Query.and([
                    Query.contains("username", searchQuery),
                    Query.orderDesc("number_of_posts"),
                    Query.limit(10)
                ])
            )
            return results
        }
        catch(error){
            return null
        }
    }

    async postCountUpdate(userId, newPostCount){
        return this.tablesDB.updateRow(
            config.appwriteDatabaseId, 
            config.appwriteUsersTableId, 
            userId, 
            {
                "number_of_posts": newPostCount
            }
        )
    }

    async likeCountUpdate(userId, newLikeCount){
        return this.tablesDB.updateRow(
            config.appwriteDatabaseId, 
            config.appwriteUsersTableId, 
            userId, 
            {
                "total_likes": newLikeCount
            }
        )
    }
}

const userDB = new UserDatabaseService()
export default userDB