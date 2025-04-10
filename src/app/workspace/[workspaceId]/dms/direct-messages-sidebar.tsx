"use client";

import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import UserItem from "./user-item";
import { useParams, useRouter } from "next/navigation";

const DirectMessagesSidebar = () => {
  const router = useRouter();
  const params = useParams();

  // Dummy data matching your modal view
  const directMessages = [
    { 
      id: "1", 
      name: "Secret Ali (you)",
      avatar: "",
      lastMessage: "are you fine",
      unread: false
    },
    { 
      id: "2", 
      name: "Raja Sultan",
      avatar: "",
      lastMessage: "useEffect(() => [...]",
      unread: true
    },
    { 
      id: "3", 
      name: "Ahsan A",
      avatar: "",
      lastMessage: "Headers...",
      unread: false
    },
    { 
      id: "4", 
      name: "muhammad.haleem",
      avatar: "",
      lastMessage: "Tables.docx",
      unread: false
    },
    { 
      id: "5", 
      name: "Huzaifa Syed",
      avatar: "",
      lastMessage: "Get Pro to unlock history",
      unread: true
    }
  ];

  return (
    <div className="flex flex-col h-full bg-[#661c68] text-white">
      {/* Search Bar */}
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Find a DM" 
            className="pl-9 bg-[#7d1c80] border-none text-white placeholder:text-gray-300"
          />
        </div>
      </div>

      {/* Unread Messages Section */}
      <div className="px-3 py-1">
        <h3 className="text-xs font-semibold text-gray-300">Unread messages</h3>
      </div>
      
      {/* Tuesday Section */}
      <div className="px-3 py-1 border-t border-[#7d1c80]">
        <h3 className="text-xs font-semibold text-gray-300">Tuesday</h3>
      </div>

      {/* Direct Messages List */}
      <div className="flex-1 overflow-y-auto">
        {directMessages.map(message => (
          <div 
            key={message.id}
            className={`px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-[#7d1c80] ${message.unread ? 'font-semibold' : ''}`}
            onClick={() => router.push(`/workspace/${params.workspaceId}/dm/${message.id}`)}
          >
            <div className="flex-1 min-w-0">
              <p className="truncate">{message.name}</p>
              <p className="text-xs text-gray-300 truncate">{message.lastMessage}</p>
            </div>
            {message.unread && (
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DirectMessagesSidebar;