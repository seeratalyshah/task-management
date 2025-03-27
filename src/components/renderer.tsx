import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";

interface RenderereProps {
  value: string;
}

const Renderer = ({ value }: RenderereProps) => {
  const [isEmpty, setIsEmpty] = useState(false);
  const rendererRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rendererRef.current) return;
    const container = rendererRef.current;

    const quill = new Quill(document.createElement("div"), { theme: "snow" });

    quill.enable(false);

    // const contents = JSON.parse(value);
    const isEmpty =
      quill
        .getText()
        .replace(/<(.|\n)*?>/g, "")
        .trim().length === 0;
    setIsEmpty(isEmpty);
    container.innerHTML = quill.root.innerHTML;

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [value]);

  if (isEmpty) return "Hello";
  return <div ref={rendererRef} className="ql-editor ql-rendere" />;
};

export default Renderer;
