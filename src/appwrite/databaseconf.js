import conf from "../conf/conf";
import { Client, ID, TablesDB, Storage, Query } from "appwrite";
class DatabseService {
  client = new Client();
  tablesDB;
  storage;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.tablesDB = new TablesDB(this.client);
    this.storage = new Storage(this.client);
  }
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.tablesDB.createRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: slug, //we can also use ID.Unique()
        data: {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
      });
    } catch (error) {
      console.log("Appwrite:createPost method error:", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.tablesDB.updateRow(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        },
      );
    } catch (error) {
      console.log("Appwrite:createPost method error:", error);
    }
  }

  async deletePost(slug) {
    try {
      return await this.tablesDB.deleteRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: slug,
      });
      return true;
    } catch (error) { 
      console.log(":error in deletPost", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      const data = await this.tablesDB.getRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: slug,
      });
      return data;
    } catch (error) {
      console.log(":error in getPost", error);
      return false;
    }
  }
  async getAllPost() {
    try {
      const data = await this.tablesDB.listRows({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        queries: [Query.equal("status", "active")],
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(":error in getallPost", error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile({
        bucketId: conf.appwriteBucketId,
        fileId: ID.unique(),
        file: file,
      });
    } catch (error) {
      console.log("upload file error :", error);
    }
  }
  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile({
        bucketId: conf.appwriteBucketId,
        fileId: fileId,
      });
      return true;
    } catch (error) {
      console.log("error in deleteFile :", error);
      return false;
    }
  }

  getfilePreview(fileId) {
    try {
      const filePath = this.storage.getFileView({
        bucketId: conf.appwriteBucketId,
        fileId: fileId,
      });

      return filePath;
    } catch (error) {
      console.log("error in getfilepreview", error);
      return false;
    }
  }
}
const databaseservice = new DatabseService();
export default databaseservice;
