import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import Quill, { type QuillOptions } from "quill";
import { cn } from "@/lib/utils";
import { Delta, Op } from "quill/core";
import { PiTextAa } from "react-icons/pi";
import { MdSend } from "react-icons/md";
import { Button } from "./ui/button";
import { FileIcon, ImageIcon, Smile, XIcon } from "lucide-react";
import Hint from "./hint";
import "quill/dist/quill.snow.css";
import EmojiPopover from "./emoji-popover";
import Image from "next/image";

type EditorValue = {
  image?: File | null;
  file?: File | null;
  body: string;
};

interface EditorProps {
  onSubmit: (value: EditorValue) => void;
  onCancel?: () => void;
  placeholder?: string;
  defaultValue?: Delta | Op[];
  disabled?: boolean;
  innerRef?: MutableRefObject<Quill | null>;
  variant?: "create" | "update";
}

const Editor = ({
  variant = "create",
  onSubmit,
  placeholder = "Write something...",
  defaultValue = [],
  disabled = false,
  innerRef,
  onCancel,
}: EditorProps) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const imageElementRef = useRef<HTMLInputElement>(null);
  const fileElementRef = useRef<HTMLInputElement>(null);

  const isEmpty = !image && !file && text.replace(/<(.|\n)*?>/g, "").trim().length === 0;

  const handleToggleToolbar = () => {
    setIsToolbarVisible((current) => !current);
    const toolbarElement = containerRef.current?.querySelector(".ql-toolbar");
    if (toolbarElement) {
      toolbarElement.classList.toggle("hidden");
    }
  };

  const onEmojiSelect = (emoji: any) => {
    const quill = quillRef.current;
    quill?.insertText(quill?.getSelection()?.index || 0, emoji.native);
  };

  const handleSubmit = () => {
    const quill = quillRef.current;
    if (!quill) return;

    const body = JSON.stringify(quill.getContents());
    onSubmit({
      body,
      ...(image && { image }),
      ...(file && { file })
    });

    // Reset the editor
    quill.setContents([]);
    setText("");
    setImage(null);
    setFile(null);
    if (imageElementRef.current) imageElementRef.current.value = "";
    if (fileElementRef.current) fileElementRef.current.value = "";
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch(extension) {
      case 'pdf': return '/icons/pdf-icon.png';
      case 'doc': case 'docx': return '/icons/word-icon.png';
      case 'xls': case 'xlsx': return '/icons/excel-icon.png';
      case 'ppt': case 'pptx': return '/icons/powerpoint-icon.png';
      case 'zip': case 'rar': return '/icons/zip-icon.png';
      default: return '/icons/file-icon.png';
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const editorContainer = container.appendChild(container.ownerDocument.createElement("div"));

    const options: QuillOptions = {
      theme: "snow",
      placeholder,
      modules: {
        toolbar: [
          ["bold", "italic", "strike"],
          ["link"],
          [{ list: "ordered" }, { list: "bullet" }],
        ],
        keyboard: {
          bindings: {
            enter: {
              key: "Enter",
              handler: () => {
                if (!isEmpty) handleSubmit();
              },
            },
            shift_enter: {
              key: "Enter",
              shiftKey: true,
              handler: () => {
                const quill = quillRef.current;
                quill?.insertText(quill?.getSelection()?.index || 0, "\n");
              },
            },
          },
        },
      },
    };

    const quill = new Quill(editorContainer, options);
    quillRef.current = quill;
    quillRef.current.focus();

    if (innerRef) innerRef.current = quill;
    quill.setContents(defaultValue);
    setText(quill.getText());

    quill.on(Quill.events.TEXT_CHANGE, () => {
      setText(quill.getText());
    });

    return () => {
      quill.off(Quill.events.TEXT_CHANGE);
      container.innerHTML = "";
      quillRef.current = null;
      if (innerRef) innerRef.current = null;
    };
  }, [innerRef]);

  return (
    <div className="flex flex-col">
      {/* Hidden input for image upload */}
      <input
        type="file"
        accept="image/*"
        ref={imageElementRef}
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="hidden"
      />
      
      {/* Hidden input for file upload (excludes images) */}
      <input
        type="file"
        ref={fileElementRef}
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="hidden"
        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar"
      />

      <div className={cn(
        "flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white",
        disabled && "opacity-50"
      )}>
        <div ref={containerRef} className="h-full ql-custom" />
        
        {/* Uploaded image preview */}
        {image && (
          <div className="p-2">
            <div className="relative size-[62px] flex items-center justify-center group/image">
              <Hint label="Remove Image">
                <button
                  onClick={() => {
                    setImage(null);
                    imageElementRef.current!.value = "";
                  }}
                  className="hidden group-hover/image:flex rounded-full bg-black/70 hover:bg-black absolute -top-2.5 -right-2.5 text-white size-6 z-[4] border-2 border-white items-center justify-center"
                >
                  <XIcon className="size-3.5" />
                </button>
              </Hint>
              <Image
                src={URL.createObjectURL(image)}
                alt="Uploaded preview"
                fill
                className="rounded-xl overflow-hidden border object-cover"
              />
            </div>
          </div>
        )}
        
        {/* Uploaded file preview */}
        {file && (
          <div className="p-2">
            <div className="relative flex items-center gap-2 p-2 border rounded-md group/file">
              <Hint label="Remove File">
                <button
                  onClick={() => {
                    setFile(null);
                    fileElementRef.current!.value = "";
                  }}
                  className="hidden group-hover/file:flex rounded-full bg-black/70 hover:bg-black absolute -top-2.5 -right-2.5 text-white size-6 z-[4] border-2 border-white items-center justify-center"
                >
                  <XIcon className="size-3.5" />
                </button>
              </Hint>
              <div className="flex items-center gap-2">
                <div className="size-10 flex items-center justify-center">
                  <Image
                    src={getFileIcon(file.name)}
                    alt="File icon"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex px-2 pb-2 z-[5]">
          <Hint label={isToolbarVisible ? "Hide formatting" : "Show formatting"}>
            <Button
              disabled={disabled}
              size="iconSm"
              variant="ghost"
              onClick={handleToggleToolbar}
            >
              <PiTextAa className="size-4" />
            </Button>
          </Hint>
          
          <EmojiPopover onEmojiSelect={onEmojiSelect}>
            <Button disabled={disabled} size="iconSm" variant="ghost">
              <Smile className="size-4" />
            </Button>
          </EmojiPopover>
          
          {variant === "create" && (
            <>
              <Hint label="Attach Image">
                <Button
                  disabled={disabled}
                  size="iconSm"
                  variant="ghost"
                  onClick={() => imageElementRef.current?.click()}
                >
                  <ImageIcon className="size-4" />
                </Button>
              </Hint>
              
              <Hint label="Attach File">
                <Button
                  disabled={disabled}
                  size="iconSm"
                  variant="ghost"
                  onClick={() => fileElementRef.current?.click()}
                >
                  <FileIcon className="size-4" />
                </Button>
              </Hint>
            </>
          )}
          
          {variant === "update" ? (
            <div className="ml-auto flex items-center gap-x-2">
              <Button variant="outline" size="sm" onClick={onCancel} disabled={disabled}>
                Cancel
              </Button>
              <Button
                disabled={disabled || isEmpty}
                onClick={handleSubmit}
                size="sm"
                className="bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
              >
                Save
              </Button>
            </div>
          ) : (
            <Button
              disabled={disabled || isEmpty}
              onClick={handleSubmit}
              size="iconSm"
              className={cn(
                "ml-auto",
                isEmpty ? "bg-white hover:bg-white text-muted-foreground"
                       : "bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
              )}
            >
              <MdSend className="size-4" />
            </Button>
          )}
        </div>
      </div>
      
      {variant === "create" && (
        <div className={cn(
          "p-2 text-[10px] text-muted-foreground flex justify-end opacity-0 transition",
          !isEmpty && "opacity-100"
        )}>
          <p><strong>Shift + Return</strong> to add a new line</p>
        </div>
      )}
    </div>
  );
};

export default Editor;