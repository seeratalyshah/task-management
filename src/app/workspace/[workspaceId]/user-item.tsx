import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const userItemVariants = cva(
  "flex item-center justify-start gap-1.5 font-normal h-7 px-4 text-sm overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-[#f9edffcc]",
        active: "text-[#4A154B] bg-white/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface UserItemProps {
  id: string;
  label?: string;
  image?: string;
  variant?: VariantProps<typeof userItemVariants>["variant"];
}

const UserItem = ({ 
  id, 
  label = "Member", 
  image, 
  variant,
  onClick 
}: UserItemProps & { onClick?: () => void }) => {
  return (
    <Button
      variant="transparent"
      className={cn(userItemVariants({ variant }))}
      size="sm"
      onClick={onClick}
    >
      <Avatar className="size-5 rounded-md mr-1">
        <AvatarImage className="rounded-md" src={image} />
        <AvatarFallback className="rounded-md bg-sky-500 text-white text-xs">
          {label.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <span className="text-sm truncate">{label}</span>
    </Button>
  );
};

export default UserItem;
