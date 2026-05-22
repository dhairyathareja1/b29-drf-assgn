import { useState } from "react";

export default function CommentBox({ onAdd }) {
  const [text, setText] = useState("");
  function handleSubmit() {
    if (!text.trim()) {
      return;
    }
    onAdd(text);
    setText("");
  }

  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleSubmit}>Add Comment</button>
    </div>
  );
}
