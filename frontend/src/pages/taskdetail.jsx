import { useState } from "react";
import CommentBox from "../components/commentbox";

export default function TaskDetail() {
  const [comments, setComments] = useState([]);
  function addComment(text) {
    setComments([...comments, text]);
  }

  return (
    <div>
      <h2>Task Detail</h2>
      <CommentBox onAdd={addComment} />
      {comments.map((c, index) => (
        <p key={index}>{c}</p>
      ))}
    </div>
  );
}
