import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("69c40e1b0038eea1e762"); // your project ID

const account = new Account(client);

account.get()
  .then((res) => console.log("SUCCESS:", res))
  .catch((err) => console.log("ERROR:", err));