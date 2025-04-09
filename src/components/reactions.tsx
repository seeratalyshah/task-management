import { cn } from "@/lib/utils";
import { Heart, Smile, ThumbsUp } from "lucide-react";
import Hint from "./hint";
import EmojiPopover from "./emoji-popover";
import { MdOutlineAddReaction } from "react-icons/md";

interface ReactionType {
  emoji: string;
  count: number;
  users: string[];
}

interface ReactionsProps {
  data: ReactionType[];
  onChange: (value: string) => void;
}

export const Reactions = ({ data, onChange }: ReactionsProps) => {
  // Map of emoji to their corresponding icons
  const emojiIcons: Record<string, JSX.Element> = {
    "👍": <ThumbsUp className="size-4" />,
    "❤️": <Heart className="size-4 text-slate-800" />,
    "😊": <Smile className="size-4" />,
    "😂": <span className="text-xs">😂</span>,
  };

  return (
    <div className="flex items-center gap-1 mt-1 mb-1">
      {data.map((reaction) => (
        <Hint key={reaction.emoji} label={`Reacted with ${reaction.emoji}`}>
          <button
            className={cn(
              "h-6 px-2 rounded-full bg-slate-200/70 border border-transparent text-slate-800 flex items-center gap-x-1",
              reaction.emoji === "❤️" && "bg-blue-100/70 border-blue-500"
            )}
          >
            {emojiIcons[reaction.emoji] || <span className="text-xs">{reaction.emoji}</span>}
            <span 
              className={cn(
                "text-xs font-semibold",
                reaction.emoji === "❤️" ? "text-blue-500" : "text-muted-foreground"
              )}
            >
              {reaction.count}
            </span>
          </button>
        </Hint>
      ))}
      <EmojiPopover
        hint="Add Reaction"
        onEmojiSelect={(emoji) => onChange(emoji.native)}
      >
        <button className="h-7 px-3 rounded-full bg-slate-200/70 border border-transparent hover:border-slate-500 text-slate-800 flex items-center gap-x-1">
          <MdOutlineAddReaction className="size-4" />
        </button>
      </EmojiPopover>
    </div>
  );
};