"use client";

import React from "react";
import WorkspaceHeader from "./workspace-header";
import { HashIcon, MessageSquareText, SendHorizonal } from "lucide-react";
import SidebarItem from "./sidebar-item";
import WorkspaceSection from "./workspace-section";
import UserItem from "./user-item";
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel-modal";
import { useParams, useRouter } from "next/navigation";

const WorkspaceSidebar = () => {
  const router = useRouter();
  const params = useParams();
  const [_open, setOpen] = useCreateChannelModal();

  // Dummy data with avatar images
  const workspace = {
    name: "Muslim Hands",
    channels: [
      { id: "1", name: "General" },
      { id: "2", name: "Normal" },
      { id: "3", name: "Announcements" }
    ],
    users: [
      { 
        id: "1", 
        name: "Seerat Ali",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      { 
        id: "2", 
        name: "John Doe",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      { 
        id: "3", 
        name: "Jane Smith",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg"
      }
    ]
  };

  const handleChannelClick = (channelId: string) => {
    router.push(`/workspace/${params.workspaceId}/channel/${channelId}`);
  };

  return (
    <div className="flex flex-col h-full bg-[#661c68]">
      <WorkspaceHeader workspace={workspace.name} />
      <div className="flex flex-col px-2 mt-3">
        <SidebarItem 
          label="Threads" 
          icon={MessageSquareText} 
          id="threads" 
          onClick={() => router.push(`/workspace/${params.workspaceId}/threads`)}
        />
        <SidebarItem 
          label="Drafts & Sent" 
          icon={SendHorizonal} 
          id="drafts" 
          onClick={() => router.push(`/workspace/${params.workspaceId}/drafts`)}
        />
      </div>
      <WorkspaceSection
        label="Channels"
        hint="New Channel"
        onNew={() => setOpen(true)}
      >
        {workspace.channels.map(channel => (
          <SidebarItem
            key={channel.id}
            label={channel.name}
            icon={HashIcon}
            id={channel.id}
            variant={params.channelId === channel.id ? "active" : "default"}
            onClick={() => handleChannelClick(channel.id)}
          />
        ))}
      </WorkspaceSection>
      <WorkspaceSection
        label="Direct Messages"
        hint="New direct Message"
        onNew={() => {}}
      >
        {workspace.users.map(user => (
          <UserItem 
            key={user.id}
            id={user.id}
            label={user.name}
            image={user.avatar}
            variant={params.userId === user.id ? "active" : "default"}
            onClick={() => router.push(`/workspace/${params.workspaceId}/user/${user.id}`)}
          />
        ))}
      </WorkspaceSection>
    </div>
  );
};

export default WorkspaceSidebar;