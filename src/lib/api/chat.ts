import type { ChatResponse } from "../../types";
import { httpClient } from "../http-client";

export const sendMessage = async (question: string, sessionId ?: string) : Promise<ChatResponse> => {
    const response = await httpClient.post("/api/laws/chat", { question, sessionId });
    return response.data;
};