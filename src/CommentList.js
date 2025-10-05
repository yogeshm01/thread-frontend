import React from "react";
import Comment from "./Comment";

function CommentList({
  comments,
  onReply,
  onLike,
  onDelete,
  replyingTo,
  onAdd,
  onCancelReply,
}) {
  if (!comments || comments.length === 0) return null;

  return (
    <div>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onReply={onReply}
          onLike={onLike}
          onDelete={onDelete}
          replyingTo={replyingTo}
          onAdd={onAdd}
          onCancelReply={onCancelReply}
        />
      ))}
    </div>
  );
}

export default CommentList;
