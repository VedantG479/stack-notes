const normalizeEditorData = (data) => {
    return {
        blocks: data.blocks.map(block => ({
            type: block.type,
            data: block.data
        }))
    }
}

export default normalizeEditorData