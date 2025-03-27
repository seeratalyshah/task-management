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
  reactions: [];
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
}

const formatFullTime = (date: Date) => {
  return `${isToday(date) ? "Today" : isYesterday(date) ? "Yesterday" : format(date, "MMM d, yyyy")} at ${format(date, "hh:mm:ss a")}`;
};

const Message = ({
  body,
  isCompact,
  updatedAt,
  isEditing,
  hideThreadButton,
  setEditingId,
}: MessageProps) => {
  const createdAt = new Date();
  const avatarFallback = "Seerat Ali".charAt(0).toUpperCase();
  if (isCompact) {
    return (
      <div
        className={cn(
          "flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60 group relative",
          isEditing && "bg-[#f2c74433] hover:bg-[#f2c74433]"
        )}
      >
        <div className="flex items-start gap-2">
          <Hint label={formatFullTime(createdAt)}>
            <button className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 w-[40px] leading-[22px] text-center hover:underline">
              {format(createdAt, "hh:mm")}
            </button>
          </Hint>
          <div className="flex flex-col w-full">
            <Renderer value={body} />
            {updatedAt ? (
              <span className="text-xs text-muted-foreground">Edited</span>
            ) : null}
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
            <AvatarImage
              className="rounded-md"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnS1o3mO3S_Nkfw1WAGaRJ6KaOGgODpfoOsA&s"
            />
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
              defaultValue="hello"
              onCancel={() => setEditingId(null)}
              variant="update"
            />
          </div>
        ) : (
          <div className="flex flex-col w-full overflow-hidden">
            <div className="text-sm">
              <button
                onClick={() => {}}
                className="font-bold text-primary hover:underline"
              >
                Seerat Ali
              </button>
              <span>&nbsp;&nbsp;</span>
              <Hint label={formatFullTime(createdAt)}>
                <button className="text-xs text-muted-foreground hover:underline">
                  {format(createdAt, "hh:mm a")}
                </button>
              </Hint>
            </div>
            <div className="flex flex-col w-full">
              <Renderer value={body} />
              <Thumbnail url="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=" />
              {updatedAt ? (
                <span className="text-xs text-muted-foreground">(edited)</span>
              ) : null}
              <Reactions data={[]} onChange={() => {}} />
            </div>
          </div>
        )}
      </div>
      {!isEditing && (
        <Toolbar
          isAuthor={true}
          isPending={false}
          handleEdit={() => setEditingId(1)}
          handleDelete={() => {}}
          handleThread={() => {}}
          handleReaction={() => {}}
          hideThreadButton={hideThreadButton}
        />
      )}
    </div>
  );
};

export default Message;
