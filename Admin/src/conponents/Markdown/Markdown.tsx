import { forwardRef } from "react"
import { Editor } from "@tinymce/tinymce-react"

interface TinyMCEEditorProps {
  placeholder?: string
  option_id?: string
  initialValue?: string
  height?: number
  disabled?: boolean
  onChange?: (content: string, option_id?: string) => void
}

const TinyMCEEditor = forwardRef<any, TinyMCEEditorProps>(
  (
    { initialValue, height = 300, onChange, disabled, option_id, placeholder },
    ref,
  ) => {


    
    return (
      <Editor
        disabled={disabled}
        onChange={(e) => {
          console.log("e.target", e?.target)

          onChange?.(e.target.getContent(), option_id || "")
        }}
        tinymceScriptSrc={'/tinymce/tinymce.min.js'}

        // apiKey="s4gsty9vdplnn3idc917nk23oln9tma3lpnetfwnpxmw4vss"
        onInit={(_evt, editor) => {
          if (ref) {
            ;(ref as any).current = editor // Assign the editor instance to the ref
          }
        }}
        init={{
          placeholder,
          height,
          plugins:
            "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
        }}
        initialValue={initialValue || ""}
      />
    )
  },
)

export default TinyMCEEditor
