import type { ChatResponse } from "../../types";
import { httpClient } from "../http-client";
import { demoChatAnswer, demoDelay, isDemoMode } from "../ai-mode";

export const sendMessage = async (question: string, sessionId ?: string) : Promise<ChatResponse> => {
    if (isDemoMode) {
        await demoDelay();
        return { sessionId: sessionId ?? "demo", answer: demoChatAnswer(question), sources: [] };
    }
    const response = await httpClient.post("/api/laws/chat", { question, sessionId });
    return response.data;
};
