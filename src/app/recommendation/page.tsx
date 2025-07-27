// app/recommendation/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle } from "lucide-react";

export default function RecommendationPage() {
  const searchParams = useSearchParams();
  const rawData = searchParams.get("data");

  const recommendationData = rawData ? JSON.parse(decodeURIComponent(rawData)) : null;

  if (!recommendationData) {
    return (
      <div className="max-w-2xl mx-auto p-10 text-center text-muted-foreground">
        No recommendations found. Please complete the assessment first.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold text-center text-primary">
        Your Personalized Recommendations
      </h1>

      <Card>
        <CardContent className="p-6 space-y-6">
          <section>
            <h2 className="text-lg font-semibold">Your Goal</h2>
            <p className="text-muted-foreground">{recommendationData.goal}</p>
          </section>

          <Separator />

          <section>
            <h2 className="text-lg font-semibold">Tips for You</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground text-sm">
              {recommendationData.tips?.map((tip: string, index: number) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-lg font-semibold">Recommended Products</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {recommendationData.products?.map((product: string, index: number) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  {product}
                </li>
              ))}
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-lg font-semibold">Note</h2>
            <p className="text-sm text-yellow-800">{recommendationData.call_to_action}</p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
