import { Client, ID, Query, TablesDB } from "appwrite"
import config from "../config/config"

class ArticleDatabaseService{
    client = new Client()
    tablesDB

    constructor(){
        this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId)
        this.tablesDB = new TablesDB(this.client)
    }

    async createArticle(title, content, status, authorId, topic){
        return this.tablesDB.createRow(
            config.appwriteDatabaseId, 
            config.appwriteArticlesTableId, 
            ID.unique(), 
            {
                "title": title, 
                "content": content, 
                "status": status, 
                "authorId": authorId, 
                "topic": topic
            }
        )
    }

    async getArticle(articleId){
        try{
            const article = this.tablesDB.getRow(
                config.appwriteDatabaseId, 
                config.appwriteArticlesTableId, 
                articleId
            )
            return article
        }
        catch(error){
            return null
        }
    }

    async getUserArticles(userId){
        try{
            const articles = this.tablesDB.listRows(
                config.appwriteDatabaseId, 
                config.appwriteArticlesTableId,
                Query.and([
                    Query.equal("authorId", userId), 
                    Query.select(['title', '$id'])
                ])
            )
            return articles
        }
        catch(error){
            return null
        }
    }

    async toggleArticleStatus(articleId, newStatus){
        return this.tablesDB.updateRow(
            config.appwriteDatabaseId, 
            config.appwriteArticlesTableId, 
            articleId, 
            {
                "status": newStatus
            }
        )
    }

    async deleteArticle(articleId){
        return this.tablesDB.deleteRow(
            config.appwriteDatabaseId,
            config.appwriteArticlesTableId, 
            articleId
        )
    }

    async updateViewCountArticle(articleId, newCount){
        return this.tablesDB.updateRow(
            config.appwriteDatabaseId, 
            config.appwriteArticlesTableId, 
            articleId, 
            {
                "views": newCount
            }
        )
    }

    async updateLikeCountArticle(articleId, newCount){
        return this.tablesDB.updateRow(
            config.appwriteDatabaseId, 
            config.appwriteArticlesTableId, 
            articleId, 
            {
                "likes": newCount
            }
        )
    }
}

const articleDB = new ArticleDatabaseService()
export default articleDB