// app/dms/[conversationId]/page.tsx
"use client";

import { MessageList } from "@/components/message-list";
import { ChannelHero } from "@/components/channel-hero";
import { useParams } from "next/navigation";

export default function ConversationPage() {
  const params = useParams();
  const conversationId = params.conversationId;

  // Mock data - replace with real data
  const messages = [
    {
      id: "1",
      memberId: "1",
      authorImage: "",
      authorName: "Secret Ali",
      isAuthor: true,
      reactions: [],
      body: "are you fine",
      image: "",
      createdAt: new Date(),
      updatedAt: "",
    },
    {
      id: "2",
      memberId: "2",
      authorImage: "",
      authorName: "Raja Sultan",
      isAuthor: false,
      reactions: [],
      body: "I'm doing well, thanks for asking! How about you?",
      image: "",
      createdAt: new Date(Date.now() - 3600000),
      updatedAt: "",
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <ChannelHero
        channelName={`Conversation with ${conversationId}`}
        creationTime={Date.now()}
      />
      <MessageList
        variant="conversation"
        channelName={`Conversation ${conversationId}`}
        channelCreationTime={Date.now()}
        data={messages}
        loadMore={() => {}}
        isLoadingMore={false}
        canLoadMore={false}
      />
    </div>
  );
}