import { forwardRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

interface TinyMCEEditorProps {
  initialValue: string;
}

const TinyMCEEditor = forwardRef<any, TinyMCEEditorProps>(({ initialValue }, ref) => {
  return (
    <Editor
      apiKey="s4gsty9vdplnn3idc917nk23oln9tma3lpnetfwnpxmw4vss"
      onInit={(_evt, editor) => {
        if (ref) {
          (ref as any).current = editor; // Assign the editor instance to the ref
        }
      }}
      init={{
        plugins:
          "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
      }}
      initialValue={initialValue}
    />
  );
});

export default TinyMCEEditor;
