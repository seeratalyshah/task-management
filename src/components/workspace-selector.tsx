// src/components/workspace-selector.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import React from "react";

interface Workspace {
  id: string; // Added ID for routing
  name: string;
  description: string;
  members: number;
  channels: number;
  lastActive: string;
}

const WorkspaceSelector = () => {
  const router = useRouter();

  const workspaces: Workspace[] = [
    {
      id: "muslimhands", // Added ID
      name: "Muslimhands",
      description: "Muslim Hands is an international aid agency and...",
      members: 120,
      channels: 25,
      lastActive: "Today",
    },
    {
      id: "tech-startup", // Added ID
      name: "Tech Startup",
      description: "Building the next generation of software products.",
      members: 32,
      channels: 10,
      lastActive: "3 days ago",
    },
    {
      id: "acme-corp", // Added ID
      name: "Acme Corporation",
      description: "A global leader in innovative solutions and...",
      members: 85,
      channels: 18,
      lastActive: "Yesterday",
    },
  ];

  const handleWorkspaceSelect = (workspaceId: string) => {
    // Navigate to the workspace channel page
    router.push(`/workspace/${workspaceId}/channel/1`);
  };

  return (
    <div className="p-8 mx-auto">
      <Card className="border-0 shadow-none">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Select a workspace</CardTitle>
        </CardHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {workspaces.map((workspace) => (
            <Card
              key={workspace.id}
              className="p-6 hover:bg-gray-50 cursor-pointer"
              onClick={() => handleWorkspaceSelect(workspace.id)} // Added click handler
            >
              <h3 className="font-semibold text-lg">{workspace.name}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {workspace.description}
              </p>
              <div className="flex gap-4 mt-3 text-sm text-gray-500">
                <span>{workspace.members} members</span>
                <span>{workspace.channels} channels</span>
                <span>Last active: {workspace.lastActive}</span>
              </div>
              <Button
                variant="outline"
                className="mt-4"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click from triggering
                  handleWorkspaceSelect(workspace.id);
                }}
              >
                Open workspace
              </Button>
            </Card>
          ))}
          <Card className="p-6 hover:bg-gray-50 cursor-pointer">
            <h3 className="font-semibold text-lg">Create a new workspace</h3>
            <p className="text-sm text-gray-600 mt-1">
              {" "}
              Start fresh with a new Slack workspace for your team
            </p>

            <Button variant="outline" className="mt-4">
              Create a new workspace
            </Button>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default WorkspaceSelector;
