import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/posts', {
          params: {
            limit: 12,
            skip: (currentPage - 1) * 12
          }
        });
        setPosts(response.data.posts);
        setTotalPages(Math.ceil(response.data.total / 12));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePostDetails = (id: number) => {
    navigate(`/posts/${id}`);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-montserrat">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Posts</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
                </div>
                <div className="text-gray-600 mb-4 line-clamp-3">
                  {post.body}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-violet-50 text-violet-600 px-2 py-1 rounded-lg text-sm"
                      >
                        {tag}
                      </span>
                    ))}
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
                currentPage === 3 && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === 3}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
