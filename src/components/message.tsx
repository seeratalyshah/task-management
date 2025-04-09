import React from "react";
import dynamic from "next/dynamic";
import { format, isToday, isYesterday } from "date-fns";
import Hint from "./hint";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Thumbnail } from "./thumbnail";
import { Toolbar } from "./toolbar";
import { cn } from "@/lib/utils";
import { Reactions } from "./reactions";

const Renderer = dynamic(() => import("@/components/renderer"), { ssr: false });
const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

interface MessageProps {
  id: number;
  memberId: number;
  authorImage: string;
  authorName: string;
  isAuthor: boolean;
  reactions: any[];
  body: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  isEditing: boolean;
  isCompact?: boolean;
  setEditingId: (id: number | null) => void;
  hideThreadButton?: boolean;
  threadCount?: number;
  threadImage?: string;
  threadTimestamp?: number;
  openThread?: (id: string) => void;
}

const formatFullTime = (dateInput: string | Date) => {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) {
    return "Unknown date";
  }
  return `${isToday(date) ? "Today" : isYesterday(date) ? "Yesterday" : format(date, "MMM d, yyyy")} at ${format(date, "hh:mm:ss a")}`;
};

const Message = ({
  id,
  memberId,
  authorImage,
  authorName,
  isAuthor,
  reactions,
  body,
  image,
  createdAt,
  updatedAt,
  isEditing,
  isCompact,
  setEditingId,
  hideThreadButton,
  threadCount,
  threadImage,
  threadTimestamp,
  openThread,
}: MessageProps) => {
  const avatarFallback = authorName.charAt(0).toUpperCase();

  if (isCompact) {
    return (
      <div
        className={cn(
          "flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60 group relative",
          isEditing && "bg-[#f2c74433] hover:bg-[#f2c74433]"
        )}
      >
        <div className="flex items-start gap-2">
          <Hint label={formatFullTime(new Date(createdAt))}>
            <button className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 w-[40px] leading-[22px] text-center hover:underline">
              {createdAt}
            </button>
          </Hint>
          <div className="flex flex-col w-full group/message">
            <Renderer value={body} />
            {image && <Thumbnail url={image} />}
            {updatedAt && (
              <span className="text-xs text-muted-foreground">Edited</span>
            )}
            {reactions.length > 0 && (
              <div className="transition">
                <Reactions data={reactions} onChange={() => {}} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex gap-2 p-1.5 px-5 hover:bg-gray-100/60 group relative">
      <div className="w-full flex items-start gap-2">
        <button>
          <Avatar className="size-5 rounded-md mr-1">
            <AvatarImage className="rounded-md" src={authorImage} />
            <AvatarFallback className="rounded-md bg-sky-500 text-white text-xs">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
        </button>

        {isEditing ? (
          <div className="w-full h-full">
            <Editor
              onSubmit={() => {}}
              disabled={false}
              defaultValue={body}
              onCancel={() => setEditingId(null)}
              variant="update"
            />
          </div>
        ) : (
          <div className="flex flex-col w-full overflow-hidden group/message">
            <div className="text-sm">
              <button className="font-bold text-primary hover:underline">
                {authorName}
              </button>
              <span>&nbsp;&nbsp;</span>
              <Hint label={formatFullTime(new Date(createdAt))}>
                <button className="text-xs text-muted-foreground hover:underline">
                  {createdAt}
                </button>
              </Hint>
            </div>
            <div className="flex flex-col w-full">
              <Renderer value={body} />
              {image && <Thumbnail url={image} />}
              {updatedAt && (
                <span className="text-xs text-muted-foreground">(edited)</span>
              )}
              {reactions.length > 0 && (
                <div className="transition">
                  <Reactions data={reactions} onChange={() => {}} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {!isEditing && (
        <div className="opacity-0 group-hover:opacity-100 transition">
          <Toolbar
            isAuthor={isAuthor}
            isPending={false}
            handleEdit={() => setEditingId(id)}
            handleDelete={() => {}}
            handleThread={() => openThread?.(id.toString())}
            handleReaction={() => {}}
            hideThreadButton={hideThreadButton}
          />
        </div>
      )}
    </div>
  );
};

export default Message;
