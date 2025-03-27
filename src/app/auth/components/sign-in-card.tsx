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
import { loginRequest, msalConfig } from "../../../../msalConfig";
import { PublicClientApplication } from "@azure/msal-browser";

interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

const msalInstance = new PublicClientApplication(msalConfig);

const SignInCard = ({ setState }: SignInCardProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state

  useEffect(() => {
    // Ensure initialization is complete
    msalInstance.initialize().catch((error) => {
      console.error("MSAL initialization failed:", error);
    });
  }, []);

  const handleLogin = async () => {
    if (loading) {
      console.log("Login is already in progress...");
      return; // Prevent multiple logins at the same time
    }

    try {
      setLoading(true); // Set loading state to true while logging in
      const loginResponse = await msalInstance.loginPopup(loginRequest);
      console.log("Login Successful!", loginResponse);
      // You can handle post-login logic here, like saving tokens
    } catch (error) {
      console.error("Login Failed!", error);
    } finally {
      setLoading(false); // Reset loading state
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
        <form className="space-y-2.5">
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
          <Button type="submit" size="lg" disabled={false} className="w-full">
            Continue
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
