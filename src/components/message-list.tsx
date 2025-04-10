import React, { useState } from "react";
import Message from "./message";
import { differenceInMinutes, format, isToday, isYesterday } from "date-fns";
import { ChannelHero } from "./channel-hero";
import { Loader } from "lucide-react";

const TIME_THRESHOLD = 5;

interface MessageListProps {
  memberName?: string;
  memberImage?: string;
  channelName: string;
  channelCreationTime: number;
  variant?: "channel" | "thread" | "conversation";
  data: any[];
  loadMore: () => void;
  isLoadingMore: boolean;
  canLoadMore: boolean;
}

const MessageList = ({
  variant = "channel",
  channelName,
  channelCreationTime,
  data,
  loadMore,
  isLoadingMore,
  canLoadMore
}: MessageListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  // Group messages by day with human-readable labels
  const groupedMessages = data.reduce((acc, message) => {
    const date = new Date(message.createdAt);
    let dateKey = format(date, 'yyyy-MM-dd');
    
    // Convert dateKey to human-readable format
    let displayDate;
    if (isToday(date)) {
      displayDate = 'Today';
    } else if (isYesterday(date)) {
      displayDate = 'Yesterday';
    } else {
      displayDate = format(date, 'MMMM d, yyyy');
    }
    
    if (!acc[dateKey]) {
      acc[dateKey] = {
        displayDate,
        messages: []
      };
    }
    acc[dateKey].messages.push({
      ...message,
      createdAt: date // Ensure createdAt is a Date object
    });
    return acc;
  }, {} as Record<string, { displayDate: string; messages: typeof data }>);

  return (
    <div className="flex-1 flex flex-col-reverse pb-4 overflow-y-auto messages-scroll">
      <div>
        {Object.entries(groupedMessages).map(([date, { displayDate, messages }]) => (
          <div key={date}>
            <div className="text-center my-2 relative">
              <hr className="absolute top-1/2 left-0 right-0 border-t border-gray-300" />
              <span className="relative inline-block bg-white px-4 py-1 rounded-full text-xs border border-gray-300 shadow-sm">
                {displayDate}
              </span>
            </div>
            
            {messages.map((message, index) => {
              // Find the previous message from the same member
              let previousMessageFromSameMember = null;
              for (let i = index - 1; i >= 0; i--) {
                if (messages[i].memberId === message.memberId) {
                  previousMessageFromSameMember = messages[i];
                  break;
                }
              }

              const isCompact = previousMessageFromSameMember && 
                differenceInMinutes(
                  message.createdAt,
                  previousMessageFromSameMember.createdAt
                ) < TIME_THRESHOLD;

              return (
                <Message
                  key={message.id}
                  id={message.id}
                  memberId={message.memberId}
                  authorImage={message.authorImage}
                  authorName={message.authorName}
                  isAuthor={message.isAuthor}
                  reactions={message.reactions}
                  body={message.body}
                  image={message.image}
                  updatedAt={message.updatedAt}
                  createdAt={format(message.createdAt, 'hh:mm a')}
                  isEditing={editingId === message.id}
                  setIsEditing={setEditingId}
                  isCompact={isCompact}
                  hideThreadButton={false}
                  threadCount={0}
                  threadImage=""
                  threadTimestamp={0}
                />
              );
            })}
          </div>
        ))}
      </div>

      {isLoadingMore && (
        <div className="text-center my-2 relative">
          <hr className="absolute top-1/2 left-0 right-0 border-t border-gray-300" />
          <span className="relative inline-block bg-white px-4 py-1 rounded-full text-xs border border-gray-300 shadow-sm">
            <Loader className="size-4 animate-spin" />
          </span>
        </div>
      )}

      {variant === "channel" && channelName && (
        <ChannelHero
          channelName={channelName}
          creationTime={channelCreationTime}
        />
      )}
    </div>
  );
};

export default MessageList;