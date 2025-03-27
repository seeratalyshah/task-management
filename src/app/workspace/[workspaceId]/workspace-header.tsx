"use client";

import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ListFilter, SquarePen } from "lucide-react";
import React, { useState } from "react";
import PreferencesModal from "./preferences-modal";
import InviteModal from "./invite-modal";

interface WorkspaceHeaderProps {
  workspace: string;
}

const WorkspaceHeader = ({ workspace }: WorkspaceHeaderProps) => {
  const [openPreferences, setOpenPreferences] = useState(false);
  const [openInvite, setOpenInvite] = useState(false);
  return (
    <>
      <InviteModal
        open={openInvite}
        setOpen={setOpenInvite}
        name="Muslim Hands"
        joinCode="1234"
      />
      <PreferencesModal
        open={openPreferences}
        setOpen={setOpenPreferences}
        initialValue="Muslim Hands"
      />
      <div className="flex items-center justify-between px-4 h-[49px] gap-0.5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="transparent"
              className="font-semibold text-lg w-auto p-1.5 overflow-hidden"
              size="sm"
            >
              <span className="truncate">{workspace}</span>
              <ChevronDown className="size-4 ml-1 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="start" className="w-64">
            <DropdownMenuItem className="cursor-pointer capitalize">
              <div className="size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-xl rounded-md flex items-center justify-center mr-2">
                W
              </div>
              <div className="flex flex-col items-start">
                <p className="font-bold">Workspace Name</p>
                <p className="text-xs text-muted-foreground">
                  Active Workspace
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer py-2"
              onClick={() => setOpenInvite(true)}
            >
              Invite people to workspace
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer py-2"
              onClick={() => setOpenPreferences(true)}
            >
              Preferences
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center gap-0.5">
          <Hint label="Filter Conversations" side="bottom">
            <Button variant="transparent" size="iconSm">
              <ListFilter className="size-4" />
            </Button>
          </Hint>
          <Hint label="New Message" side="bottom">
            <Button variant="transparent" size="iconSm">
              <SquarePen className="size-4" />
            </Button>
          </Hint>
        </div>
      </div>
    </>
  );
};

export default WorkspaceHeader;
