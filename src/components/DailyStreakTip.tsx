"use client";

import { useEffect, useState } from "react";
import { Sparkles, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function DailyStreakTip() {
  const [tip, setTip] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCard, setShowCard] = useState(true);

  useEffect(() => {
    const fetchTip = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/daily-tip");
        const data = await res.json();
        setTip(data?.tip || "Stay hydrated and take short walks to stay active.");
      } catch (err) {
        setTip("We couldn't fetch your tip right now. Please check back later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTip();
  }, []);

  if (!showCard) return null;

  return (
    <Card
      className={cn(
        "relative mt-6 mx-auto w-full max-w-xl rounded-xl p-6 shadow-xl border border-gray-200",
        "bg-white/60 backdrop-blur-md transition-opacity duration-700 ease-out animate-fade-in"
      )}
    >
      {/* Close Button */}
      <button
        onClick={() => setShowCard(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
        aria-label="Close tip"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="flex items-center space-x-3 mb-3">
        <div className="bg-yellow-200 text-yellow-700 rounded-full p-2 shadow-sm">
          <Sparkles className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold">Daily Health Tip</h3>
      </div>

      <p className="text-sm text-gray-800 leading-relaxed">
        {loading ? "Fetching your tip..." : tip}
      </p>
    </Card>
  );
}
