import conf from '../conf/conf'

import { Client,ID,Databases,Storage,Query } from 'appwrite'

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.bucket);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
              conf.appwriteDatabaseId,
              conf.appwriteCollectionId,
              slug,
              {title,
                content,
                featuredImage,
                status,
                userId
              }  
            );
        } catch (error) {
            console.log("Aprrwrite service:: createPost :: error",error);
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
         try {
             return await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{
                title,
                content,
                featuredImage,
                status,
             })
         } catch (error) {
            console.log("Aprrwrite service:: updatePost :: error",error);
         }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Aprrwrite service:: deletePost :: error",error);
            return false;
        }
    }

    async getPost(slug){
        try {
           return  await this.databases.getDocument(conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

        } catch (error) {
            console.log("Aprrwrite service:: getPost :: error",error);
        }
    }

    async getPosts(quries = [Query.equal("status",'active')]){
          try {
               return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                quries,
               )
          } catch (error) {
            console.log("Aprrwrite service:: getPosts :: error",error);
          }
    }
}


const service = new Service()

export default service