import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CopyIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface InviteModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  name: string;
  joinCode: string;
}

const InviteModal = ({ open, setOpen, name, joinCode }: InviteModalProps) => {
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleCopy = () => {
    const inviteLink = `${window.location.origin}/join/workspace/1?code=${joinCode}`;
    navigator.clipboard
      .writeText(inviteLink)
      .then(() => toast.success("Invite link is copied to clipboard"));
  };

  const handleSendEmail = () => {
    console.log("API call to send email to", email);
    toast.success(`Invitation sent to ${email}`);
    setEmail("");
    setMessage("");
  };

  const handleGoogleWorkspace = () => {
    console.log("Continue with Google Workspace");
    // Implement Google Workspace integration here
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite people to {name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Send to
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@muslimhands.ngo"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* <div className="flex items-center justify-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div> */}

          {/* <Button
            onClick={handleGoogleWorkspace}
            variant="outline"
            className="w-full"
          >
            Continue with Google Workspace
          </Button> */}

          {/* <div className="pt-2">
            <input
              type="text"
              placeholder="Start typing a message anywhere, then find it!"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div> */}
        </div>

        <div className="flex justify-between pt-4">
        <Button onClick={handleCopy} variant="ghost" >
              Copy invite link <CopyIcon className="size-4 ml-2" />
            </Button>
          <Button onClick={handleSendEmail}>Send</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;