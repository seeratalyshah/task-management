import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";
import React from "react";

const WorkspaceSwitcher = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl">
          A
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" className="w-64">
        <DropdownMenuItem className="cursor-pointer flex flex-col justify-start items-start capitalize">
          Workspace one
          <span className="text-xs text-muted-foreground">
            Active Workspace
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer capitalize overflow-hidden">
          <div className="size-9 shrink-0 relative overflow-hidden bg-[#616061] text-white font-semibold text-lg rounded-md mr-2 flex items-center justify-center">
            W
          </div>
          <p className="truncate">Workspace two</p>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <div className="size-9 relative overflow-hidden bg-[#F2F2F2] text-slate-800 font-semibold text-lg rounded-md mr-2 flex items-center justify-center">
            <Plus />
          </div>
          Create a New Workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WorkspaceSwitcher;
