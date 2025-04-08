"use client";

import React from "react";
import Header from "../../../header";
import ChatInput from "../../../chat-input";
import MessageList from "@/components/message-list";
import { useParams } from "next/navigation";

// Dummy direct messages data for different users
const userData = {
  "1": {
    name: "Seerat Ali",
    messages: [
      {
        id: "1",
        memberId: "1",
        authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
        authorName: "Seerat Ali",
        isAuthor: false,
        reactions: [],
        body: "Hey, how are you doing?",
        image: "",
        createdAt: Date.now() - 3600000,
        updatedAt: null,
      },
      {
        id: "2",
        memberId: "current",
        authorImage: "https://randomuser.me/api/portraits/men/22.jpg",
        authorName: "You",
        isAuthor: true,
        reactions: [],
        body: "I'm good, thanks for asking!",
        image: "",
        createdAt: Date.now() - 1800000,
        updatedAt: null,
      }
    ],
  },
  "2": {
    name: "John Doe",
    messages: [
      {
        id: "1",
        memberId: "2",
        authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
        authorName: "John Doe",
        isAuthor: false,
        reactions: [],
        body: "Did you see the latest updates?",
        image: "",
        createdAt: Date.now() - 86400000,
        updatedAt: null,
      },
      {
        id: "2",
        memberId: "current",
        authorImage: "https://randomuser.me/api/portraits/men/22.jpg",
        authorName: "You",
        isAuthor: true,
        reactions: [],
        body: "Yes, I'm reviewing them now",
        image: "",
        createdAt: Date.now() - 82800000,
        updatedAt: null,
      }
    ],
  },
  "3": {
    name: "Jane Smith",
    messages: [
      {
        id: "1",
        memberId: "3",
        authorImage: "https://randomuser.me/api/portraits/women/65.jpg",
        authorName: "Jane Smith",
        isAuthor: false,
        reactions: [],
        body: "Hello, How are you doing?",
        image: "https://plus.unsplash.com/premium_photo-1687203673190-d39c3719123a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGVsbG98ZW58MHx8MHx8fDA%3D",
        createdAt: Date.now() - 86400000,
        updatedAt: null,
      },
      {
        id: "2",
        memberId: "current",
        authorImage: "https://randomuser.me/api/portraits/men/22.jpg",
        authorName: "You",
        isAuthor: true,
        reactions: [],
        body: "I am good, thanks!",
        image: "",
        createdAt: Date.now() - 82800000,
        updatedAt: null,
      }
    ],
  },
};

const UserIdPage = () => {
  const params = useParams();
  const userId = params.userId as string;

  // Get user info from dummy data
  const user = userData[userId] || {
    name: "Unknown User",
    messages: [],
  };

  return (
    <div className="flex flex-col h-full">
      <Header title={user.name} isUser />
      <MessageList
        variant="conversation"
        channelName={`Direct Message with ${user.name}`}
        channelCreationTime={Date.now() - 86400000} // 1 day ago
        data={user.messages}
        loadMore={() => {}}
        isLoadingMore={false}
        canLoadMore={false}
      />
      <ChatInput placeholder={`Message ${user.name}`} />
    </div>
  );
};

export default UserIdPage;