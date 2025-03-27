"use client"

import React, { useState } from "react";
import Toolbar from "./Toolbar";
import Sidebar from "./sidebar";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import WorkspaceSidebar from "./workspace-sidebar";
import { Loader } from "lucide-react";
import { Thread } from "@/features/messages/components/thread";

interface WorkSpaceIdLayoutProps {
  children: React.ReactNode;
  showPanel: boolean;
  parentMessageId: number;
}

const WorkspaceIdlayout = ({
  children,
  showPanel = true,
  parentMessageId = 1,
}: WorkSpaceIdLayoutProps) => {
  return (
    <div className="h-full">
      <Toolbar />
      <div className="flex h-[94.5vh]">
        <Sidebar />
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            defaultSize={20}
            minSize={11}
            className="bg-[#03abc9]"
          >
            <WorkspaceSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={20}>{children}</ResizablePanel>
          {showPanel && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel minSize={20} defaultSize={29}>
                {parentMessageId ? (
                  <Thread messageId = {parentMessageId} onClose={() => {}} />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Loader className="size-5 animate-spin text-muted-foreground" />
                  </div>
                )}
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default WorkspaceIdlayout;
