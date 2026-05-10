import { Account, Client, ID } from "appwrite";
import config from "../config/config";

class AuthService{
    client = new Client()
    account

    constructor(){
        this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount(name, email, password){
        try{
            const user = await this.account.create(
                ID.unique(), 
                email, 
                password, 
                name
            )
            if(user)    await this.loginAccount(email, password)
            return user
        }
        catch(error){
            throw error
        }
    }

    async loginAccount(email, password){
        return this.account.createEmailPasswordSession(
            email, 
            password
        )
    }

    async logoutAccount(){
        return this.account.deleteSession('current')
    }

    async getCurrentUser(){
        try{
            const user = this.account.get()
            return user
        }
        catch(error){
            return null
        }
    }
}

const auth = new AuthService()
export default auth