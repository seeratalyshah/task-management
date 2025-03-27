import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import React from "react";
import { IconType } from "react-icons/lib";

interface SidebarButtonProps {
  icon: LucideIcon | IconType;
  label: string;
  isActive: boolean;
}

const SidebarButton = ({ icon: Icon, label, isActive }: SidebarButtonProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-0.5 cursor-pointer group">
      <Button
        variant="transparent"
        className={`${isActive && "bg-accent/20"} size-9 p-2 group-hover:bg-accent/20`}
      >
        <Icon className="size-5 text-white group-hover:scale-110 transition-all" />
      </Button>
      <span className="text-white text-[11px] group-hover:text-accent">
        {label}
      </span>
    </div>
  );
};

export default SidebarButton;
