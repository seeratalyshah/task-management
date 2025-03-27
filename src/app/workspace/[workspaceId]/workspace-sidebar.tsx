"use client";

import React from "react";
import WorkspaceHeader from "./workspace-header";
import { HashIcon, MessageSquareText, SendHorizonal } from "lucide-react";
import SidebarItem from "./sidebar-item";
import WorkspaceSection from "./workspace-section";
import UserItem from "./user-item";
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel-modal";

const WorkspaceSidebar = () => {
  const [_open, setOpen] = useCreateChannelModal();
  const channelId = 1;
  return (
    <div className="flex flex-col h-full bg-[#03abc9]">
      <WorkspaceHeader workspace="Muslim Hands" />
      <div className="flex flex-col px-2 mt-3">
        <SidebarItem label="Threads" icon={MessageSquareText} id="threads" />
        <SidebarItem label="Drafts & Sent" icon={SendHorizonal} id="drafts" />
      </div>
      <WorkspaceSection
        label="Channels"
        hint="New Channel"
        onNew={() => setOpen(true)}
      >
        <SidebarItem
          label="General"
          icon={HashIcon}
          id="general"
          variant={channelId === 1 ? "active" : "default"}
        />
        <SidebarItem
          label="Normal"
          icon={HashIcon}
          id="normal"
          variant={channelId === 2 ? "active" : "default"}
        />
      </WorkspaceSection>
      <WorkspaceSection
        label="Direct Messages"
        hint="New direct Message"
        onNew={() => {}}
      >
        <UserItem label="Seerat Ali" />
      </WorkspaceSection>
    </div>
  );
};

export default WorkspaceSidebar;
