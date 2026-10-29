import axios from "axios";
import { AI_URL } from "./ai-mode";

export const httpClient = axios.create({
    baseURL: AI_URL ?? "http://localhost:8000",
    timeout: 30000,
})
