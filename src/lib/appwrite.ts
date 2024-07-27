import { Client, Account } from "appwrite";

export const client = new Client();

enum CONFIG {
  target = import.meta.env.VITE_PROJECT_URL,
  projectID = import.meta.env.VITE_PROJECT_ID,
}

client
  .setEndpoint(CONFIG.target as unknown as string)
  .setProject(CONFIG.projectID as unknown as string);

export const account = new Account(client);
export { ID } from "appwrite";
