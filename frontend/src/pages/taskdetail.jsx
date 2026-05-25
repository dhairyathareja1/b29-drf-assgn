import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

export default function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  async function fetchData() {
    try {
      const taskRes = await api.get(`/tasks/${id}/`);
      setTask(taskRes.data);
      const commentRes = await api.get(`/comments/?task=${id}`);
      setComments(commentRes.data.results || commentRes.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const taskRes = await api.get(`/tasks/${id}/`);
        setTask(taskRes.data);
        const commentRes = await api.get(`/comments/?task=${id}`);
        setComments(commentRes.data.results || commentRes.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [id]);

  async function handleComment(e) {
    e.preventDefault();
    if (!content.trim()) {
      return;
    }

    try {
      await api.post("/comments/", {
        task: id,
        content: content,
      });

      setContent("");
      fetchData();
    } catch (err) {
      console.log(err);
      console.log(err.response?.data);
    }
  }

  if (!task) {
    return <p>Loading...</p>;
  }

  return (
    <div className="page">
      <div className="card">
        <h1>{task.title}</h1>
        <p>Status: {task.status}</p>
        <p>Priority: {task.priority}</p>
      </div>

      <form onSubmit={handleComment}>
        <textarea
          placeholder="Write a comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button>Add Comment</button>
      </form>

      <div>
        {comments.length === 0 && <p>No comments yet</p>}
        {comments.map((comment) => (
          <div className="comment" key={comment.id}>
            <h4>{comment.username}</h4>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
