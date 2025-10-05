import React, { useEffect, useState } from "react";
import CommentList from "./CommentList";
import ReplyInput from "./ReplyInput";

const API_URL = "https://thread-backend-hnkf.onrender.com/comments";  

function App() {
  const [comments, setComments] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);

  // Fetch all comments when app loads or on changes
  const fetchComments = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(setComments);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // Add new comment or reply
  const handleAdd = (text, parentId) => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        author: "DemoUser",
        parentId: parentId || null,
      }),
    })
      .then(res => res.json())
      .then(() => {
        fetchComments();
        setReplyingTo(null);
      });
  };

  // Like a comment
  const handleLike = id => {
    fetch(`${API_URL}/${id}/like`, { method: "POST" })
      .then(() => fetchComments());
  };

  const handleDelete = (commentId) => {
    // Try to delete on the backend first, then refresh from server.
    // If the backend is unavailable, fall back to updating local state.
    const deleteCommentLocal = (comments) =>
      comments
        .filter((comment) => comment.id !== commentId)
        .map((comment) => ({
          ...comment,
          children: deleteCommentLocal(comment.children),
        }));

    fetch(`${API_URL}/${commentId}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete on server");
        return res;
      })
      .then(() => fetchComments())
      .catch((err) => {
        console.error("Delete request failed, falling back to local update:", err);
        setComments((prev) => deleteCommentLocal(prev));
      });
  };

  // Show reply input for a specific comment
  const handleReply = id => setReplyingTo(id);

  // Hide reply input
  const handleCancelReply = () => setReplyingTo(null);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Threaded Comments</h1>

      <ReplyInput
        parentId={null}
        onSubmit={handleAdd}
        onCancel={null}
        placeholder="Write a new comment"
      />

      <div className="mt-8">
        <CommentList
          comments={comments}
          onReply={handleReply}
          onLike={handleLike}
          replyingTo={replyingTo}
          onDelete={handleDelete}
          onAdd={handleAdd}
          onCancelReply={handleCancelReply}
        />
      </div>
    </div>
  );
}

export default App;
