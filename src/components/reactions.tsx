import { cn } from "@/lib/utils";
import { Heart, Smile } from "lucide-react";
import Hint from "./hint";
import EmojiPopover from "./emoji-popover";
import { MdOutlineAddReaction } from "react-icons/md";

interface ReactionsProps {
  data: Array<string>;
  onChange: (value: string) => void;
}

export const Reactions = ({ onChange }: ReactionsProps) => {
  return (
    <div className="flex items-center gap-1 mt-1 mb-1">
      <Hint label="reacted with :)">
        <button
          className={cn(
            "h-6 px-2 rounded-full bg-slate-200/70 border border-transparent text-slate-800 flex items-center gap-x-1"
          )}
        >
          <Smile className="size-4" />
          <span className="text-xs font-semibold text-muted-foreground">1</span>
        </button>
      </Hint>
      <Hint label="Reacted with heart">
        <button
          className={cn(
            "h-6 px-2 rounded-full bg-blue-100/70 border border-blue-500 text-white flex items-center gap-x-1 "
          )}
        >
          <Heart className="size-4 text-slate-800" />
          <span className="text-xs font-semibold text-blue-500">3</span>
        </button>
      </Hint>
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
