// Likes.js
import React from "react";
import { FaTimes } from "react-icons/fa";

const Likes = ({ showLikers, setShowLikers }) => {
  return (
    <>
      {showLikers && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl relative">
            <button
              className="absolute top-3 right-3 text-gray-600"
              onClick={() => setShowLikers(null)}
              aria-label="Close likers popup"
            >
              <FaTimes size={20} />
            </button>
            <h3 className="text-lg font-semibold mb-4">Liked by</h3>
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {showLikers.likers.map((liker) => (
                <a
                  key={liker._id}
                  href={`/profile/${liker._id}`}
                  className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-md"
                >
                  <img
                    src={
                      liker.avatarUrl ||
                      "https://i.pinimg.com/736x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg"
                    }
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium">{liker.userName}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Likes;
