"use client";
import { useEffect } from "react";
import UserButton from "./auth/components/user-button";
import { useOpenWorkspaceModal } from "@/features/workspaces/store/use-open-workspace-modal";

export default function Home() {
  const [open, setOpen] = useOpenWorkspaceModal();
  const workspaces = [
    {
      id: 1,
      workspace: "Muslimhands",
    },
    {
      id: 2,
      workspace: "test",
    },
  ];

  useEffect(() => {
    if (!open) {
      setOpen(true);
    }
  }, [open, setOpen]);

  return (
    <div>
      <p>Logged In!</p>
      <UserButton />
    </div>
  );
}
