import Layout from "./components/layout";
import TaskCard from "./components/taskcard";
import CommentBox from "./components/commentbox";

function App() {
  const sampleTask = {
    title: "Create Poster",
    stage: "Draft",
    priority: "High",
  };

  function addComment(text) {
    console.log("Comment:", text);
  }

  return (
    <Layout>
      <h1>Creative Studio Test</h1>

      <TaskCard task={sampleTask} />

      <CommentBox onAdd={addComment} />
    </Layout>
  );
}

export default App;
