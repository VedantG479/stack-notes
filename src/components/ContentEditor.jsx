import EditorJS from "@editorjs/editorjs"
import { useEffect, useRef, useState } from "react"

export default function ContentEditor({content, editorRef, checkDirty}) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!editorRef.current && content) {
            const editor = new EditorJS({
                holder: "editor-holder",
                placeholder: "Start writing...",
                autofocus: true, 
                data: content,
                onChange: async () => {
                    await checkDirty()
                }
            })

            editor.isReady
                .then(() => {
                    editorRef.current = editor
                    setLoading(false)
                })
                .catch((error) => {
                    console.log("error loading editor:", error)
                })
        }
        return () => {
            if (editorRef.current?.destroy) {
                editorRef.current.destroy()
                editorRef.current = null
            }
        }
    }, [])

    return (
        <section className="min-h-[200px] text-[14px] leading-[2] text-[#C9C6C1] outline-none mb-12">
            {loading && (
                <p className="text-[#727782] text-[13px] mb-20">
                    Loading editor...
                </p>
            )}
            <div
                id="editor-holder"
                className="min-h-[200px] text-[14px] leading-[2] text-[#D3D0CB]"/>
        </section>
    )
}