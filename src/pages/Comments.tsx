// src/pages/Comments.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface Comment {
  id: number;
  body: string;
  postId: number;
  user: {
    id: number;
    username: string;
    email: string;
    avatar: string;
  };
}

const Comments = () => {
  const navigate = useNavigate();
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/comments', {
          params: {
            limit: 12,
            skip: (currentPage - 1) * 12
          }
        });
        setComments(response.data.comments);
        setTotalPages(Math.ceil(response.data.total / 12));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setIsLoading(false);
      }
    };
    fetchComments();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCommentDetails = (id: number) => {
    navigate(`/comments/${id}`);
  };

  const getInitials = (username: string) => {
    const words = username.split(' ');
    return words.map((word) => word.charAt(0).toUpperCase()).join('');
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-montserrat">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Comments</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-2">
                    {getInitials(comment.user.username)}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Comment by {comment.user.username}</h3>
                </div>
                <div className="text-gray-600 mb-4 line-clamp-3">
                  {comment.body}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{comment.user.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            <button
              className={cn(
                "p-3 rounded-none bg-blue-600 text-white hover:bg-violet-700 transition-colors",
                currentPage === 1 && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: 3 }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={cn(
                  "p-3 rounded-none hover:bg-violet-100 transition-colors",
                  currentPage === page && "text-violet-600 font-bold"
                )}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            <button
              className={cn(
                "p-3 rounded-none bg-blue-600 text-white hover:bg-violet-700 transition-colors",
                currentPage === Math.ceil(comments.length / 12) && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === Math.ceil(comments.length / 12)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
