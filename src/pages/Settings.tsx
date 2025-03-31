import React, { useState, useEffect } from 'react';
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

const Settings = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/users/1');
        setUser(response.data);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
  };

  const handleSaveChanges = async () => {
    if (user) {
      try {
        const response = await axios.put(`https://dummyjson.com/users/${user.id}`, {
          firstName,
          lastName,
          email,
          phone
        });
        setUser({
          ...user,
          firstName,
          lastName,
          email,
          phone
        });
        alert('Changes saved successfully!');
      } catch (error) {
        console.error('Error saving changes:', error);
        alert('Error saving changes. Please try again.');
      }
    }
  };
  

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-montserrat">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-6">
            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mr-4">
              {getInitials(firstName, lastName)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{firstName} {lastName}</h2>
              <p className="text-gray-500">{email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-violet-600"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-violet-600"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-violet-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-violet-600"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-violet-700 transition-colors"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
