import { useCallback, useEffect } from "react"
import Author from "../components/Author"
import SearchAuthor from "../components/SearchAuthor"
import { useLoaderData, useNavigate, useRevalidator } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import auth from "../appwrite/auth"
import { logout } from "../store/authSlice"

export default function HomePage() {
    const authorList = useLoaderData()
    const revalidator = useRevalidator()
    const {searchQuery} = useSelector(state => state.search)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {isAuthenticated} = useSelector(state => state.auth)

    const logoutHandler = useCallback(() => {
        auth.logoutAccount()
            .then(() => {
                dispatch(logout())
                location.reload()
            })
            .catch((error) => {
                console.log('error logging out: ', error)
            })
    })

    useEffect(() => {revalidator.revalidate()}, [searchQuery, revalidator])

    return (
        <main className="min-h-screen bg-[#0B0D14] text-[#E7E4DF]">
            <div className="max-w-[760px] pl-24 pt-28 pb-24">

                <SearchAuthor/>

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