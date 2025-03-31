import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
}

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/users', {
          params: {
            limit: 12,
            skip: (currentPage - 1) * 12
          }
        });
        setUsers(response.data.users);
        setTotalPages(Math.ceil(response.data.total / 12));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleUserDetails = (id: number) => {
    navigate(`/users/${id}`);
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-montserrat">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-2">
                    {getInitials(user.firstName, user.lastName)}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{user.firstName} {user.lastName}</h3>
                </div>
                <div className="text-gray-600 mb-4 line-clamp-3">
                  {user.email}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{user.phone}</span>
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
                currentPage === Math.ceil(users.length / 12) && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === Math.ceil(users.length / 12)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
