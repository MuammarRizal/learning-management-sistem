// Editor.tsx
"use client";
import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const TextEditor = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Tulis sesuatu di sini...",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // formatting
            [{ header: 1 }, { header: 2 }], // heading
            [{ list: "ordered" }, { list: "bullet" }], // list
            [{ script: "sub" }, { script: "super" }], // sub/sup
            [{ indent: "-1" }, { indent: "+1" }], // indent
            [{ align: [] }], // align
            ["link", "image"], // link and image
            ["clean"], // clear formatting
          ],
        },
      });

      // Contoh ambil data dari editor
      quillInstance.current.on("text-change", () => {
        const content = quillInstance.current?.root.innerHTML;
        console.log("Content:", content);
      });
    }
  }, []);

  return (
    <div>
      <div ref={editorRef} style={{ height: "300px" }} />
    </div>
  );
};

export default TextEditor;
