import userDB from "../appwrite/user"
import store from "../store/store"

async function searchResultLoader(){
    const state = store.getState()
    const {searchQuery} = state.search
    const {userId} = state.auth

    if(searchQuery.length != 0 && searchQuery.length < 3)   return []
    try{
        let authorList = await userDB.getUsers(searchQuery, userId)
        authorList = authorList.rows
        return authorList
    }
    catch(error){
        return []
    }
}

export default searchResultLoader