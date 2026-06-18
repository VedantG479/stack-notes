import { useSelector } from "react-redux"
import userDB from "../appwrite/user"

async function searchResultLoader(){
    const {searchQuery} = useSelector(state => state.search)
    const {userId} = useSelector(state => state.auth)

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