import { useEffect, useState } from "react"
import userDB from "../appwrite/user"
import Author from "../components/Author"
import SearchAuthor from "../components/SearchAuthor"

export default function HomePage() {
    const [authorList, setAuthorList] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    const fetchAuthors = (search = '') => {
        setAuthorList([])
        if(search.length < 3)   search = ''  
        userDB.getUsers(search)
            .then((result) => {
                if(result && result.total > 0)  setAuthorList(result.rows)  
            })
            .catch((error) => {
                console.log('error fetching authors: ', error)
                setAuthorList([])
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
                    <button className="hover:text-[#FF5C8A] transition-colors">
                        Me
                    </button>
                    <button className="hover:text-[#FF5C8A] transition-colors">
                        Contact Us
                    </button>
                    <button className="hover:text-[#FF5C8A] transition-colors">
                        Login / Signup
                    </button>
                </footer>
            </div>
        </main>
    )
}