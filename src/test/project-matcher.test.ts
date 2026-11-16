import { describe, expect, it } from "vitest";
import { parseProjectRecommendations } from "@/lib/project-matcher.shared";

describe("portfolio recommendation validation", () => {
  it("keeps at most three recommendations and drops unknown project IDs", () => {
    const result = parseProjectRecommendations(JSON.stringify({
      recommendations: [
        { projectId: "website", reason: "A responsive site is a close fit." },
        { projectId: "unknown", reason: "Not in this portfolio." },
        { projectId: "email", reason: "Email sorting aligns with this request." },
        { projectId: "voice", reason: "The assistant concept may help." },
        { projectId: "commercial", reason: "A relevant film concept." },
      ],
    }));

    expect(result.map((item) => item.projectId)).toEqual(["website", "email", "voice"]);
  });

  it("removes duplicate project recommendations and rejects malformed model output", () => {
    const duplicate = parseProjectRecommendations(JSON.stringify({
      recommendations: [
        { projectId: "website", reason: "First match." },
        { projectId: "website", reason: "Duplicate." },
      ],
    }));

    expect(duplicate).toEqual([{ projectId: "website", reason: "First match." }]);
    expect(parseProjectRecommendations("not json")).toEqual([]);
  });
});