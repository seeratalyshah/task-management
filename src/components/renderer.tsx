import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";

interface RenderereProps {
  value: string;
}

const Renderer = ({ value }: RenderereProps) => {
  const rendererRef = useRef<HTMLDivElement>(null);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (!rendererRef.current) return;

    const container = rendererRef.current;
    const tempContainer = document.createElement("div");
    const quill = new Quill(tempContainer, { theme: "snow" });
    
    // Load the HTML into Quill
    quill.clipboard.dangerouslyPasteHTML(value);
    
    // Check if it's empty
    const text = quill.getText().trim();
    setIsEmpty(text.length === 0);

    // Set the rendered HTML
    container.innerHTML = quill.root.innerHTML;

    return () => {
      container.innerHTML = "";
    };
  }, [value]);

  if (isEmpty) return <div className="text-muted-foreground">No content</div>;
  return <div ref={rendererRef} className="ql-editor ql-renderer" style={{ padding: 0 }}/>;
};

export default Renderer;
