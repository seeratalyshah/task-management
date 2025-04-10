"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Building2, Users, MessageCircleMore, Clock4, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

interface Workspace {
  id: string;
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
      id: "muslimhands",
      name: "Muslimhands",
      description: "Muslim Hands is an international aid agency and a symbol of collaboration for a better world.",
      members: 120,
      channels: 25,
      lastActive: "Today",
    },
    {
      id: "tech-startup",
      name: "Tech Startup",
      description: "Building the next generation of software products with a focus on collaboration and innovation.",
      members: 32,
      channels: 10,
      lastActive: "3 days ago",
    },
    {
      id: "acme-corp",
      name: "Acme Corporation",
      description: "A global leader in innovative solutions, where teamwork drives success and innovation.",
      members: 85,
      channels: 18,
      lastActive: "Yesterday",
    },
  ];

  const handleWorkspaceSelect = (workspaceId: string) => {
    router.push(`/workspace/${workspaceId}/channel/1`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b1f] via-[#3f0e40] to-[#350d36] py-16 px-6 relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-50">
        <img 
          src="https://kissflow.com/hubfs/Feature-Image-Business-Collaboration.jpg"
          alt="Background"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex justify-center mb-10">
  <motion.div
    className="bg-[#4A154B]/70 px-8 py-6 rounded-xl shadow-2xl text-center"
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <h2 className="text-5xl font-bold text-white drop-shadow-lg mb-4">
      Select a Workspace
    </h2>
    <p className="text-lg text-gray-200 drop-shadow-md">
      Choose a workspace to start collaborating with your team. Make your work more productive and creative.
    </p>
  </motion.div>
</div>

        <Card className="border-0 shadow-none bg-transparent">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {workspaces.map((workspace, index) => (
              <motion.div
                key={workspace.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card
                  className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
                  onClick={() => handleWorkspaceSelect(workspace.id)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Building2 className="text-[#611f69] w-6 h-6" />
                    <h3 className="font-semibold text-xl">{workspace.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{workspace.description}</p>
                  <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-[#1264a3]" />
                      {workspace.members} members
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircleMore className="w-4 h-4 text-[#007a5a]" />
                      {workspace.channels} channels
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock4 className="w-4 h-4 text-[#e01e5a]" />
                      {workspace.lastActive}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWorkspaceSelect(workspace.id);
                    }}
                  >
                    Open workspace
                  </Button>
                </Card>
              </motion.div>
            ))}

            {/* Create new workspace */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: workspaces.length * 0.2 }}
            >
              <Card className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <PlusCircle className="text-[#2eb67d] w-6 h-6" />
                  <h3 className="font-semibold text-lg">Create a new workspace</h3>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Start fresh with a new Slack workspace for your team
                </p>
                <Button variant="outline" className="mt-4">
                  Create a new workspace
                </Button>
              </Card>
            </motion.div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WorkspaceSelector;
