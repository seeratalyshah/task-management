"use client";

import React, { useState } from "react";
import Toolbar from "./toolbar";
import Sidebar from "./sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import WorkspaceSidebar from "./workspace-sidebar";
import { Loader } from "lucide-react";
import { Thread } from "@/features/messages/components/thread";
import DirectMessagesSidebar from "./dms/direct-messages-sidebar";

interface WorkSpaceIdLayoutProps {
  children: React.ReactNode;
  showPanel?: boolean;
  parentMessageId?: number;
  showDMs?: boolean;
}

const WorkspaceIdlayout = ({
  children,
  showPanel = true,
  parentMessageId,
  showDMs = false,
}: WorkSpaceIdLayoutProps) => {
  const [isThreadOpen, setIsThreadOpen] = useState(showPanel);
  const [isDMsOpen, setIsDMsOpen] = useState(showDMs);

  console.log("isDMsOpen", isDMsOpen);

  return (
    <div className="h-full">
      <Toolbar />
      <div className="flex" style={{height: "calc(100vh - 40px)"}}>
        <Sidebar onOpenDms={() => setIsDMsOpen(true)} onCloseDms={() => setIsDMsOpen(false)}/>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            defaultSize={20}
            minSize={11}
            className="bg-[#661c68]"
          >
            {isDMsOpen ? (
              <DirectMessagesSidebar /> // Render DM view in the sidebar area
            ) : (
              <WorkspaceSidebar />
            )}
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={20}>{children}</ResizablePanel>

          {isThreadOpen && parentMessageId && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel minSize={20} defaultSize={29}>
                <Thread
                  messageId={parentMessageId}
                  onClose={() => setIsThreadOpen(false)}
                />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default WorkspaceIdlayout;