import HttpAxiosManager from "../http/HttpAxiosManager";

export const http = new HttpAxiosManager(import.meta.env.VITE_BASE_URL ?? "");
