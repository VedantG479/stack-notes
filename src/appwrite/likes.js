import { Client, ID, Query, TablesDB } from "appwrite";
import config from "../config/config";

class LikesDatabaseService{
    client = new Client()
    tablesDB

    constructor(){
        this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId)
        this.tablesDB = new TablesDB(this.client)
    }

    async getArticleLikeCount(articleId){
        try{
            const likeRecord = await this.tablesDB.listRows(
                config.appwriteDatabaseId, 
                config.appwriteLikesTableId, 
                [
                    Query.equal("articleId", articleId)
                ]
            )
            return likeRecord
        }
        catch(error){
            throw error
        }
    }

    async getLikeRecord(userId, articleId){
        try{
            const likeRecord = await this.tablesDB.listRows(
                config.appwriteDatabaseId, 
                config.appwriteLikesTableId, 
                [
                    Query.equal("userId", userId), 
                    Query.equal("articleId", articleId)
                ]
            )
            return likeRecord
        }
        catch(error){
            throw error
        }
    }

    async likeArticle(userId, articleId){
        return this.tablesDB.createRow(
            config.appwriteDatabaseId, 
            config.appwriteLikesTableId, 
            ID.unique(), 
            {
                "userId": userId, 
                "articleId": articleId
            }
        )
    }

    async unLikeArticle(userId, articleId){
        try{
            const likeRecord = await this.getLikeRecord(userId, articleId)
            if(likeRecord){
                await this.tablesDB.deleteRow(
                    config.appwriteDatabaseId, 
                    config.appwriteLikesTableId, 
                    likeRecord.rows[0].$id
                )
            }
        }
        catch(error){
            throw error
        }
    }

    async deleteArticleLikes(articleId){
        return await this.tablesDB.deleteRows(
            config.appwriteDatabaseId, 
            config.appwriteLikesTableId, 
            [
                Query.equal("articleId", articleId)
            ]
        )
    }
}

const likesDB = new LikesDatabaseService()
export default likesDB