import edjsHTML from "editorjs-html"
const parser = edjsHTML()

export default function renderEditorContent(content){
    if(!content)    return ''

    const parsed =  typeof content === 'string' ? JSON.parse(content) : content
    return parser.parse(parsed)
}