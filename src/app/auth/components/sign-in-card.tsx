import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import React, { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SignInFlow } from "../types";
import { msalConfig } from "../../../../msalConfig";
import { PublicClientApplication } from "@azure/msal-browser";

interface SignInCardProps {
  setState: (state: SignInFlow) => void;
  onLoginSuccess: () => void;
}

const msalInstance = new PublicClientApplication(msalConfig);

const SignInCard = ({ setState, onLoginSuccess }: SignInCardProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state

  useEffect(() => {
    // Ensure initialization is complete
    msalInstance.initialize().catch((error) => {
      console.error("MSAL initialization failed:", error);
    });
  }, []);

  // Update the handleLogin function in your SignInCard component
  const handleLogin = async () => {
    console.log("Login initiated"); // Debug log
    if (loading) return;
  
    setLoading(true);
    console.log("Loading state set to true"); // Debug log
  
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("After simulated delay"); // Debug log
  
      if (email === "seerat@gmail.com" && password === "1234") {
        console.log("Credentials valid, calling onLoginSuccess"); // Debug log
        onLoginSuccess();
      } else {
        console.log("Invalid credentials"); // Debug log
        throw new Error("Please enter credentials");
      }
    } catch (error) {
      console.error("Login Failed!", error);
    } finally {
      console.log("Login process complete"); // Debug log
      setLoading(false);
    }
  };

  return (
    <Card className="h-full w-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <form
          className="space-y-2.5"
          onSubmit={(e) => {
            e.preventDefault(); // Prevent default form submission
            handleLogin(); // Call your login handler
          }}
        >
          <Input
            disabled={false}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required={true}
          />
          <Input
            disabled={false}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required={true}
          />
          <Button
            type="submit"
            size="lg"
            disabled={loading} // Add loading state here too
            className="w-full"
          >
            {loading ? "Logging in..." : "Continue"}
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={loading} // Disable button while login is in progress
            onClick={handleLogin}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FcGoogle className="absolute top-3.5 left-3.5" />
            {loading ? "Logging in..." : "Continue with Google"}
          </Button>
          <Button
            disabled={loading}
            onClick={() => {}}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FaGithub className="absolute top-3.5 left-3.5" />
            {loading ? "Logging in..." : "Continue with Github"}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => setState("signUp")}
            className="text-sky-700 hover:underline cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignInCard;
