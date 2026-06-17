import { useEffect, useState } from "react"
import userDB from "../appwrite/user"
import Author from "../components/Author"
import SearchAuthor from "../components/SearchAuthor"
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import auth from "../appwrite/auth"
import { logout } from "../store/authSlice"

export default function HomePage() {
    const [authorList, setAuthorList] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {isAuthenticated, userId} = useSelector(state => state.auth)

    const fetchAuthors = (search = '') => {
        setAuthorList([])
        if(search.length != 0 && search.length < 3)   return
        userDB.getUsers(search, userId)
            .then((result) => {
                if(result && result.total > 0)  setAuthorList(result.rows)  
            })
            .catch((error) => {
                console.log('error fetching authors: ', error)
                setAuthorList([])
            })
    }

    const logoutHandler = () => {
        auth.logoutAccount()
            .then(() => {
                dispatch(logout())
            })
            .catch((error) => {
                console.log('error logging out: ', error)
            })
    }

    useEffect(() => fetchAuthors(), [])
    useEffect(() => fetchAuthors(searchQuery), [searchQuery])

    return (
        <main className="min-h-screen bg-[#0B0D14] text-[#E7E4DF]">
            <div className="max-w-[760px] pl-24 pt-28 pb-24">

                <SearchAuthor searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>

                <section className="space-y-20">
                    {
                        authorList.map((author) => (
                            <Author key={author.$id} author={author}/>
                        ))
                    }
                </section>

                <footer className="mt-32 pt-8 border-t border-[#171B26] flex items-center gap-8 text-[12px] text-[#70757E]">
                    {isAuthenticated && 
                    <button className="hover:text-[#FF5C8A] transition-colors"
                        onClick={() => navigate('/dashboard')}>
                        Me
                    </button>}
                    <button className="hover:text-[#FF5C8A] transition-colors" onClick={() => window.location.href = 'mailto:vedantgarg1157@gmail.com'}>
                        Contact Us
                    </button>
                    {!isAuthenticated ? 
                    <button className="hover:text-[#FF5C8A] transition-colors"
                        onClick={() => navigate('/login', {
                                            state: { from: location.pathname }
                                        } //TO NAVIGATE BACK TO PREVIOUS PAGE AFTER LOGGING IN!
                        )}>
                        Login / Signup
                    </button> : 
                    <button className="hover:text-[#FF5C8A] transition-colors"
                        onClick={logoutHandler}>
                        Logout
                    </button>}
                </footer>
            </div>
        </main>
    )
}