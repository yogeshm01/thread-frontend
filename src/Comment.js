import React from "react";
import CommentList from "./CommentList";
import ReplyInput from "./ReplyInput";

function Comment({
    comment,
    onReply,
    onLike,
    onDelete,
    replyingTo,
    onAdd,
    onCancelReply,
}) {
    const isReplying = replyingTo === comment.id;

    return (
        <div className="relative ml-6 mb-6">
            {/* Curved connector SVG for replies */}
            {comment.parentId && (
                <svg className="absolute -left-6 top-6" height="40" width="24">
                    <path d="M20 0 Q0 24, 20 40" stroke="#94a3b8" strokeWidth="2" fill="none" />
                </svg>
            )}

            <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="w-8 h-8 bg-gray-400 rounded-full" />
                {/* Comment Body */}
                <div className="flex-1">
                    <div className="flex gap-2 items-center">
                        <span className="font-bold text-sm">{comment.author}</span>
                        <span className="text-xs text-gray-400">
                            {new Date(comment.timestamp).toLocaleTimeString()}
                        </span>
                    </div>
                    <div className="text-sm mt-1">{comment.text}</div>
                    <div className="flex gap-4 mt-2">
                        <span className="text-xs">{comment.likes} likes</span>
                        <button
                            className="text-xs text-blue-500"
                            onClick={() => onReply(comment.id)}
                        >
                            Reply
                        </button>
                        <button
                            className="text-xs text-green-500"
                            onClick={() => onLike(comment.id)}  // ✅ This now handles increment
                        >
                            Like   {/* ✅ Changed from '+1' to 'Like' */}
                        </button>
                        <button
                            className="text-xs text-red-500"
                            onClick={() => onDelete(comment.id)}
                            title="Delete"
                        >
                            🗑️
                        </button>
                    </div>
                    {/* Reply input under comment */}
                    {isReplying && (
                        <ReplyInput
                            parentId={comment.id}
                            onSubmit={onAdd}
                            onCancel={onCancelReply}
                            placeholder="Write a reply..."
                        />
                    )}
                    {/* Recursive replies */}
                    {comment.children && comment.children.length > 0 && (
                        <CommentList
                            comments={comment.children}
                            onReply={onReply}
                            onLike={onLike}
                            onDelete={onDelete}
                            shouldFocus={true}
                            replyingTo={replyingTo}
                            onAdd={onAdd}
                            onCancelReply={onCancelReply}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Comment;
