import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import CommentBox from "../components/commentbox";

export default function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function load() {
      const taskResponse = await api.get(`/tasks/${id}/`);
      setTask(taskResponse.data);
      const commentResponse = await api.get(`/comments/?task=${id}`);
      setComments(commentResponse.data);
    }

    load();
  }, [id]);

  async function addComment(text) {
    await api.post("/comments/", { task: id, text });
    const response = await api.get("/comments/");
    setComments(response.data.filter((comment) => comment.task === Number(id)));
  }

  if (!task) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <CommentBox onAdd={addComment} />

      {comments.map((comment) => (
        <div key={comment.id} className="card">
          <b>{comment.username}</b>
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
}
