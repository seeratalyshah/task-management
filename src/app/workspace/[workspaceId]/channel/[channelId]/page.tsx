"use client";

import React, { useState } from "react";
import Header from "../../../header";
import ChatInput from "../../../chat-input";
import MessageList from "@/components/message-list";
import { useParams } from "next/navigation";

// Dummy data for different channels
const channelData = {
  "1": {
    name: "General",
    creationTime: Date.now() - 86400000 * 7, // 7 days ago
    messages: [
      {
        id: "1",
        memberId: "1",
        authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
        authorName: "Seerat Ali",
        isAuthor: false,
        reactions: [
          { emoji: "👍", count: 2, users: ["1", "2"] }, // Seerat Ali and John Doe reacted
          { emoji: "❤️", count: 1, users: ["3"] } // Jane Smith reacted
        ],
        body: "Hello everyone! Welcome to the General channel!",
        image: "",
        createdAt: Date.now() - 3600000, // 1 hour ago
        updatedAt: null,
      },
      {
        id: "2",
        memberId: "2",
        authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
        authorName: "John Doe",
        isAuthor: false,
        reactions: [
          { emoji: "😂", count: 1, users: ["1"] } // Seerat Ali reacted
        ],
        body: "Thanks for having me here! Looking forward to collaborating.",
        image: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
        createdAt: Date.now() - 1800000, // 30 mins ago
        updatedAt: null,
      }
    ],
  },
  "2": {
    name: "Normal",
    creationTime: Date.now() - 86400000 * 3, // 3 days ago
    messages: [
      {
        id: "1",
        memberId: "3",
        authorImage: "https://randomuser.me/api/portraits/women/65.jpg",
        authorName: "Jane Smith",
        isAuthor: false,
        reactions: [],
        body: "This is the Normal channel",
        image: "",
        createdAt: Date.now() - 7200000, // 2 hours ago
        updatedAt: null,
      },
      {
        id: "2",
        memberId: "2",
        authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
        authorName: "John Doe",
        isAuthor: false,
        reactions: [],
        body: "What's everyone working on?",
        image: "",
        createdAt: Date.now() - 3600000, // 1 hour ago
        updatedAt: null,
      }
    ],
  },
  "3": {
    name: "Announcements",
    creationTime: Date.now() - 86400000, // 1 day ago
    messages: [
      {
        id: "1",
        memberId: "1",
        authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
        authorName: "Seerat Ali",
        isAuthor: false,
        reactions: [],
        body: "Important announcement for everyone!",
        image: "",
        createdAt: Date.now() - 10800000, // 3 hours ago
        updatedAt: null,
      }
    ],
  },
};

const ChannelIdPage = () => {
  const params = useParams();
  const channelId = params.channelId as string;
  const [messages, setMessages] = useState(channelData[channelId]?.messages || []);

  const handleSendMessage = ({ body, image }: { body: string; image: string }) => {
    const newMessage = {
      id: Date.now().toString(),
      memberId: "current", // Assuming current user
      authorImage: "https://randomuser.me/api/portraits/men/22.jpg",
      authorName: "You",
      isAuthor: true,
      reactions: [],
      body: JSON.parse(body).ops[0].insert.trim(),
      image: image || "",
      createdAt: Date.now(),
      updatedAt: null,
    };

    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex flex-col h-full">
      <Header title={channelData[channelId]?.name || "Unknown Channel"} />
      <MessageList
        variant="channel"
        channelName={channelData[channelId]?.name || "Unknown Channel"}
        channelCreationTime={channelData[channelId]?.creationTime || Date.now()}
        data={messages}
        loadMore={() => {}}
        isLoadingMore={false}
        canLoadMore={false}
      />
      <ChatInput 
        placeholder={`Message #${channelData[channelId]?.name || "channel"}`} 
        onSend={handleSendMessage}
      />
    </div>
  );
};

export default ChannelIdPage;