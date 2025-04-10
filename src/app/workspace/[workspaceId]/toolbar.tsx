import { Button } from "@/components/ui/button";
import { Info, Search } from "lucide-react";
import React from "react";

const Toolbar = () => {
  return (
    <nav className="bg-[#4A154B] flex items-end justify-between h-10 p-1.5">
      <div className="flex-1" />
      <div className="min-w-[280px] max-w-[642px] grow-[2] shrink">
        <Button
          size="sm"
          className="bg-accent/25 hover:bg-accent-25 w-full justify-start h-7 px-2"
        >
          <Search className="size-4 text-white mr-2" />
          <span className="text-white text-sm">Search Workspace</span>
        </Button>
      </div>
      <div className="ml-auto  flex-1 flex items-center justify-end">
        <Button variant="transparent" size="iconSm">
          <Info className="size-5 text-white" />
        </Button>
      </div>
    </nav>
  );
};

export default Toolbar;
