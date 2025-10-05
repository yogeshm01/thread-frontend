import React, { useState, useEffect, useRef } from "react";

function ReplyInput({ parentId, onSubmit, onCancel, placeholder, shouldFocus }) {
  const [text, setText] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    if (shouldFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [shouldFocus]); // runs whenever shouldFocus changes

  const handleSend = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    onSubmit(text, parentId);
    setText("");
  };

  return (
    <form onSubmit={handleSend} className="flex items-center gap-2 mt-2 ml-10">
      <input
        type="text"
        ref={inputRef}
        className="flex-1 p-2 border border-gray-300 rounded"
        placeholder={placeholder || "Write a reply..."}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
      >
        Send
      </button>
      {onCancel && (
        <button
          type="button"
          className="text-xs text-gray-400 px-2"
          onClick={onCancel}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default ReplyInput;
