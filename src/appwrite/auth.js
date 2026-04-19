import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
   
  }

async createuser({ email, password, name }) {
  try {
    const user = await this.account.create(
      ID.unique(),
      email,
      password,
      name
    );

    if (user) {
      return await this.login({ email, password });
    }

  } catch (error) {
    throw error;
  }
}

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(
        email,
        password
      );
    } catch (error) {
      throw error;
    }
  }

  // async getCurrentUser() {
  //   try {
  //     console.log("Account:",this.account)
  //     return await this.account.get();
      
  //   } catch (error) {
  //     return null;
  //   }
  // }
  async getCurrentUser() {
  try {
    return await this.account.get();
  } catch (error) {
    console.log("User not logged in");
    return null;
  }
}

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log(error);
    }
  }
}

const authservice = new AuthService();
export default authservice;