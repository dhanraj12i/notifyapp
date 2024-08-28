import { Client, Account, Graphql, ID } from "appwrite";

enum CONFIG {
  target = import.meta.env.VITE_PROJECT_URL,
  projectID = import.meta.env.VITE_PROJECT_ID,
}
const client = new Client()
  .setEndpoint(CONFIG.target as unknown as string)
  .setProject(CONFIG.projectID as unknown as string);

const graphql = new Graphql(client);
const account = new Account(client);

export { ID, client, graphql, account };
