import React, { useState } from "react";
import Message from "./message";
import { differenceInMinutes } from "date-fns";
import { ChannelHero } from "./channel-hero";
import { Loader } from "lucide-react";

const TIME_THRESHOLD = 5;

interface MessageListProps {
  memberName: string;
  memberImage: string;
  channelName: string;
  channelCreationTime: number;
  variant?: "channel" | "thread" | "conversation";
  data: [] | undefined;
  loadMore: () => void;
  isLoadingMore: boolean;
  canLoadMore: boolean;
}

const MessageList = ({
  memberName,
  memberImage,
  channelName,
  channelCreationTime,
  variant = "channel",
  data,
  loadMore,
  isLoadingMore,
  canLoadMoreisLoadingMore,
}: MessageListProps) => {
  //   const previousMessage = "Hi";
  //   const isCompact =
  //     previousMessage &&
  //     previousMessage?._id === message.user?._id &&
  //     differenceInMinutes(
  //       new Date(message._creationTime),
  //       new Date(previousMessage._creationTime)
  //     ) < TIME_THRESHOLD;

  const [editingId, setEditingId] = useState(null);

  const channelCreationTimee = new Date();

  return (
    <div className="flex-1 flex flex-col-reverse pb-4 overflow-y-auto messages-scroll">
      <div>
        <div className="text-center my-2 relative">
          <hr className="absolute top-1/2 left-0 right-0 border-t border-gray-300" />
          <span className="relative inline-block bg-white px-4 py-1 rounded-full text-xs border border-gray-300 shadow-sm">
            Today
          </span>
        </div>
        <Message
          key="1"
          id="1"
          memberId="2"
          authorImage="d"
          authorName="Seerat Ali"
          isAuthor={false}
          reactions=""
          body="Hello"
          image=""
          updatedAt=""
          createdAt="Today"
          isEditing={false}
          setIsEditing={() => {}}
          isCompact={false}
          hideThreadButton={false}
          threadCount=""
          threadImage=""
          threadTimestamp=""
        />
      </div>
      {/* <div>
        <button onClick={loadMore}>Load More</button>
      </div> */}
      {isLoadingMore && (
        <div className="text-center my-2 relative">
          <hr className="absolute top-1/2 left-0 right-0 border-t border-gray-300" />
          <span className="relative inline-block bg-white px-4 py-1 rounded-full text-xs border border-gray-300 shadow-sm">
            <Loader className="size-4 animate-spin" />
          </span>
        </div>
      )}
      {variant === "channel" && channelName && channelCreationTime && (
        <ChannelHero
          channelName="General"
          creationTime={channelCreationTimee}
        />
      )}
    </div>
  );
};

export default MessageList;
