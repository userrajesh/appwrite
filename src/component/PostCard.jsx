import React from "react";
import appwriteService from "../appwrite/databaseconf";
import { Link } from "react-router-dom";
function PostCard({ $id, title, content, featuredImage }) {
  const imagePath = appwriteService.getfilePreview(featuredImage).toString();
  return (
    <>
      <Link to={`/post/${$id}`}>
        <div className="w-full bg-gray-50 rounded-xl p-4">
          <div className="w-full mb-4 justify-center">
             <img src={imagePath} alt={title} /> 
          </div>
          <h1 className="text-xl font-bold mb-2">{title}</h1>

          <p className="text-gray-600">{content}</p>
        </div>
      </Link>
    </>
  );
}

export default PostCard;
