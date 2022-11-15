import { Editor, EditorState, convertFromRaw } from 'draft-js'
import decorators from './entity-decorator'
import { atomicBlockRenderer } from './block-redender-fn'

// to be separate
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
}
const blockRendererFn = (block) => {
  const atomicBlockObj = atomicBlockRenderer(block)
  return atomicBlockObj
}

const getBlockStyle = (block) => {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote'

    default:
      return null
  }
}

export default function DraftRenderer({ rawContentBlock }) {
  const contentState = convertFromRaw(rawContentBlock)
  const editorState = EditorState.createWithContent(contentState, decorators)

  return (
    <>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="https://storage.googleapis.com/static-readr-tw-dev/cdn/draft-js/rich-editor.css"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/draft-js/0.11.7/Draft.css"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
        rel="stylesheet"
        type="text/css"
      />
      <Editor
        editorState={editorState}
        readOnly
        customStyleMap={styleMap}
        blockRendererFn={blockRendererFn}
        blockStyleFn={getBlockStyle}
      />
    </>
  )
}
