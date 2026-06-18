import articleDB from "../appwrite/article"
import normalizeEditorData from "../utils/normalizeEditorData"

async function writeArticleLoader({params}){
    const {articleId} = params

    if(!articleId)  return fillEmpty()
    
    const article = await articleDB.getArticle(articleId)
    if(!article)    return fillEmpty()

    const parsedContent = normalizeEditorData(JSON.parse(article.content))
    const initialState = {
        title: article.title, 
        topic: article.topic,
        content: parsedContent
    }

    return {
        currentDataLoader: initialState, 
        savedDataLoader: initialState, 
        editorReadyLoader: true, 
        statusLoader: article.status
    }
}

function fillEmpty(){
    const initialState = {
        title: '',
        topic: 'C++',
        content: {
            blocks: []
        }
    }

    return {
        currentDataLoader: initialState, 
        savedDataLoader: initialState, 
        editorReadyLoader: true, 
        statusLoader: 'draft'
    }
}

export default writeArticleLoader