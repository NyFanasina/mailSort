import { useState } from "react";
import MessageItem from "./message-item";

export default function MessageList({ messages = [] }) {
  const [selectedId, setSelectedId] = useState(null);

  if (messages.length === 0) {
    return <div className="text-center mt-5">Aucun message dans cette catégorie.</div>;
  }

  return (
    <div className="divide-y divide-gray-200 rounded-xl bg-white overflow-hidden">
      {messages.map((message) => (
        <MessageItem message={message} key={message.id} selectedId={selectedId} setSelectedId={setSelectedId} />
      ))}
    </div>
  );
}
