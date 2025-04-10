// components/sidebar.tsx
"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Bell, Home, MessageSquare, MoreHorizontal } from "lucide-react";

import UserButton from "@/app/auth/components/user-button";
import WorkspaceSwitcher from "./workspace-switcher";
import SidebarButton from "./sidebar-button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface SidebarProps {
  onOpenDms: () => void;
  onCloseDms: () => void;
}

const Sidebar = ({ onOpenDms, onCloseDms }: SidebarProps) => {
  const router = useRouter();
  const params = useParams();
  const [isHovering, setIsHovering] = useState(false);
  const [activeButton, setActiveButton] = useState("Home"); // default active

  return (
    <aside className="w-[70px] bg-[#4A154B] flex flex-col gap-y-4 items-center pt-[9px] pb-4 h-full">
      <WorkspaceSwitcher />

      <SidebarButton
        icon={Home}
        label="Home"
        isActive={activeButton === "Home"}
        onClick={() => {
          setActiveButton("Home");
          onOpenDms();
          onCloseDms();
          router.push(`/workspace/${params.workspaceId}/channel/1`);
        }}
      />

      {/* DMs Button with Hover Popover */}
      {/* <Popover open={isHovering} onOpenChange={setIsHovering}>
        <PopoverTrigger asChild>
          <div
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          > */}
            <SidebarButton
              icon={MessageSquare}
              label="DMs"
              isActive={activeButton === "DMs"}
              onClick={() => {
                setIsHovering(false);
                setActiveButton("DMs");
                onOpenDms();
                router.push(`/workspace/${params.workspaceId}/dms`);
              }}
            />
          {/* </div>
        </PopoverTrigger> */}
        {/* <PopoverContent
          className="w-80 p-2 max-h-[80vh] overflow-y-auto"
          side="right"
          align="start"
          sideOffset={20}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="space-y-2">
            <div className="px-2 py-1 text-sm font-semibold">Direct Messages</div>

            {[
              {
                name: "Secret Ali (you)",
                preview: "You: are you fine",
              },
              {
                name: "Raja Sultan",
                preview: "useEffect(() => [...",
              },
              {
                name: "Ahsan A",
                preview: "You: Headers...",
              },
              {
                name: "muhammad.haleem",
                preview: "You: Tables.docx",
              },
              {
                name: "Huzaifa Syed",
                preview: "Get Pro to unlock history",
              },
            ].map((dm, idx) => (
              <div
                key={idx}
                className="text-sm p-2 hover:bg-gray-100 rounded cursor-pointer"
              >
                <strong>{dm.name}</strong>
                <div className="text-xs text-muted-foreground truncate">{dm.preview}</div>
              </div>
            ))}
          </div>
        </PopoverContent> */}
      {/* </Popover> */}

      <SidebarButton icon={Bell} label="Activity" />
      <SidebarButton icon={MoreHorizontal} label="More" />

      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
        <UserButton />
      </div>
    </aside>
  );
};

export default Sidebar;
