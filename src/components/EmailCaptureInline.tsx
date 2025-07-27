"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function EmailCaptureInline() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSend = async () => {
    if (!email.trim()) return;
    setStatus("sending");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/capture-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, user_id: "test123" }),
      });

      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="border border-gray-200 rounded-md p-4 bg-white mt-4 shadow-sm">
      <h4 className="text-base font-medium mb-2">Get Your Report via Email</h4>
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
        />
        <Button
          onClick={handleSend}
          disabled={status === "sending" || !email.trim()}
          className="bg-blue-600 text-white"
        >
          {status === "sending" ? "Sending..." : "Send"}
        </Button>
      </div>
      {status === "success" && (
        <p className="text-green-600 text-sm mt-2">Report sent successfully!</p>
      )}
      {status === "error" && (
        <p className="text-red-600 text-sm mt-2">
          Failed to send. Please try again later.
        </p>
      )}
    </div>
  );
}
