import { useNavigate, useParams } from "react-router"
import ContentEdtior from "../components/ContentEditor"
import { useCallback, useEffect, useRef, useState } from "react"
import articleDB from "../appwrite/article"
import { useSelector } from "react-redux"
import normalizeEditorData from "../utils/normalizeEditorData"

export default function WriteArticlePage() {
    const editorRef = useRef(null)
    const {articleId} = useParams()
    const [editorReady, setEditorReady] = useState(false)
    const {userId} = useSelector(state => state.auth)
    const navigate = useNavigate()

    const [savedData, setSavedData] = useState(null)
    const [currentData, setCurrentData] = useState(null)
    const [status, setStatus] = useState('draft')
    const [isDirty, setIsDirty] = useState(false)

    function fillEmpty(){
        const initialState = {
            title: '',
            topic: 'C++',
            content: {
                blocks: []
            }
        }
        setCurrentData(initialState)
        setSavedData(initialState)
        setEditorReady(true)
    }
    
    useEffect(() => {
        if(!articleId){
            fillEmpty()
            return
        }
        articleDB.getArticle(articleId)
            .then((article) => {
                if(!article){
                    fillEmpty()
                    return
                }

                const parsedContent = normalizeEditorData(JSON.parse(article.content))
                setStatus(article.status)
                setEditorReady(true)

                const initialState = {
                    title: article.title,
                    topic: article.topic,
                    content: parsedContent
                }
                setCurrentData(initialState)
                setSavedData(initialState)
            })
    }, [articleId])

    const saveArticle = useCallback(async() => {
        if(!editorRef.current)  return
        try{
            const outputData = await editorRef.current.save()
            if(outputData.blocks.length == 0 || !currentData?.title.trim() || !currentData?.topic){
                console.log('enter all values')
                return
            }

            console.log('saving..', outputData)
            if(!articleId){
                const article = await articleDB.createArticle(currentData.title, JSON.stringify(outputData), 'draft', userId, currentData.topic)
                navigate(`/write/${article.$id}`)
            }
            else    await articleDB.updateArticle(articleId, currentData.title, JSON.stringify(outputData), 'draft', currentData.topic)
            const savedState = {
                title: currentData.title, 
                topic: currentData.topic,
                content: normalizeEditorData(outputData)
            }
            setSavedData(savedState)
            setIsDirty(false)
        }
        catch(error){
            console.log('error saving content: ', error)
        }
    }, [currentData])

    const publishArticle = async() => {
        await articleDB.toggleArticleStatus(articleId, 'published')
        setStatus('published')
    }

    const checkDirty = async() => {
        if(!editorRef.current || !currentData || !savedData) return
        const currentEditorData = await editorRef.current.save()

        const currentNormalized = {
            title: currentData.title.trim(),
            topic: currentData.topic,
            content: normalizeEditorData(currentEditorData)
        }

        const savedNormalized = {
            title: savedData.title.trim(),
            topic: savedData.topic,
            content: normalizeEditorData(savedData.content)
        }

        const isChanged = JSON.stringify(savedNormalized) !== JSON.stringify(currentNormalized)
        setIsDirty(isChanged)
    }

    useEffect(() => {
        checkDirty()
    }, [currentData])

    return (
        <main className="min-h-screen bg-[#0B0D14] text-[#E7E4DF]">
            <div className="max-w-[860px] pl-24 pt-28 pb-24">
                <section className="mb-10">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#6C717B] mb-5">
                        Write Article
                    </p>
                    <input
                        type="text"
                        placeholder="Article title..."
                        value={currentData?.title || ''}
                        onChange={(e) => setCurrentData(prev => ({...prev, title: e.target.value}))}
                        className="w-full bg-transparent border-none outline-none text-[28px] leading-[1.5] tracking-[-0.03em] placeholder:text-[#4F5563]"/>
                </section>
                <section className="mb-16 flex items-center gap-10 text-[13px] text-[#727782]">
                    <select
                        className="bg-transparent border-none outline-none text-[#B6B2AC] cursor-pointer"
                        value={currentData?.topic || ''}
                        onChange={(e) => setCurrentData(prev => ({...prev, topic: e.target.value}))}>
                        <option value='C++'>C++</option>
                        <option value='Java'>Java</option>
                        <option value='Distributed Systems'>Distributed Systems</option>
                        <option value='Databases'>Databases</option>
                    </select>
                </section>
                {editorReady && <ContentEdtior content={currentData.content} editorRef={editorRef} checkDirty={checkDirty}/>}
                <section className="flex items-center gap-10 text-[13px] text-[#727782]">
                    {articleId && status == 'draft' && <button className="hover:text-[#FF5C8A] transition-colors" 
                        onClick={publishArticle}>
                        publish
                    </button>}
                    <button 
                        disabled={!isDirty}
                        className={`hover:text-[#FF5C8A] transition-colors ${isDirty ? '' : 'disabled:opacity-50 disabled:pointer-events-none'}`}
                        onClick={saveArticle}>
                        save draft
                    </button>
                    <button className="hover:text-[#FF5C8A] transition-colors"
                        onClick={() => navigate('/dashboard')}>
                        cancel
                    </button>
                </section>
            </div>
        </main>
    )
}