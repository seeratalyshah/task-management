import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import React from "react";
import { IconType } from "react-icons/lib";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sidebarItemVariants = cva(
  "flex item-center justify-start gap-1.5 font-normal h-7 px-[18px] text-sm overflow-hidden",
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

interface SidebarItemProps {
  label: string;
  id: string;
  icon: LucideIcon | IconType;
  variant?: VariantProps<typeof sidebarItemVariants>["variant"];
  onClick?: () => void;
}

const SidebarItem = ({ label, id, icon: Icon, variant, onClick }: SidebarItemProps) => {
  return (
    <Button
      variant="transparent"
      size="sm"
      className={cn(sidebarItemVariants({ variant: variant }))}
      onClick={onClick}
    >
      <Icon className="size-3.5 mr-1 shrink-0" />
      <span className="text-sm truncate">{label}</span>
    </Button>
  );
};

export default SidebarItem;