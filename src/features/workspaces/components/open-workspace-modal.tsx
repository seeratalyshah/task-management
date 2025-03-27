"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useOpenWorkspaceModal } from "../store/use-open-workspace-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const OpenWorkSpaceModal = () => {
  const [open, setOpen] = useOpenWorkspaceModal();
  const router = useRouter();
  const [selectedWorkspace, setSelectedWorkspace] = useState<string | null>(
    null
  );

  const workspaces = [
    { id: "1", name: "Muslim Hands" },
    { id: "2", name: "Test 1" },
    { id: "3", name: "Test 2" },
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    if (selectedWorkspace) {
      setOpen(false); // Close the modal immediately
      setTimeout(() => {
        router.push(`/workspace/${selectedWorkspace}/channel/1`);
      }, 0); // Ensures modal state updates first
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Open a workspace</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Select onValueChange={setSelectedWorkspace}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a workspace" />
            </SelectTrigger>
            <SelectContent>
              {workspaces.map((workspace) => (
                <SelectItem key={workspace.id} value={workspace.id}>
                  {workspace.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end">
          <Button disabled={!selectedWorkspace} onClick={handleOpen}>
            Open
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
