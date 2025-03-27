"use client";

import React from "react";
import Header from "./header";
import ChatInput from "./chat-input";
import MessageList from "@/components/message-list";

const ChannelIdPage = () => {
  return (
    <div className="flex flex-col h-full">
      <Header title="General" />
      <MessageList channelName="Muslim Hands" channelCreationTime={122232} data={[]} loadMore={() => {}} isLoadingMore={status === "LoadingMore"} canLoadMore={status === "CanLoardMore"}/>
      <ChatInput placeholder={`Message # General`} />
    </div>
  );
};

export default ChannelIdPage;
