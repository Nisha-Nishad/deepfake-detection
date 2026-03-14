import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { User, Mail, Calendar, Edit, Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState({
    uid: '',
    name: '',
    email: '',
    password: '',
    created_at: '',
    avatar: 'http://via.placeholder.com/150?text=User'
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({ name: '', email: '', password: '' });
  const [savedUser, setSavedUser] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

    if (token && storedUser) {
      setUser({
        uid: storedUser.uid || 'N/A',
        name: storedUser.name || 'User',
        email: storedUser.email || 'email@example.com',
        password: storedUser.password || '********',
        created_at: storedUser.created_at || new Date().toISOString(),
        avatar: storedUser.avatar || 'http://via.placeholder.com/150?text=User'
      });
      setEditData({
        name: storedUser.name || '',
        email: storedUser.email || '',
        password: storedUser.password || ''
      });
      setSavedUser(storedUser);
    }
    setLoading(false);
  }, []);

  const handleUpdate = () => {
    const updatedUser = { ...savedUser, ...editData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setEditing(false);
    alert("Profile updated successfully!");
  };

  if (loading) return <div className="text-white text-lg text-center mt-20">Loading...</div>;

  const token = localStorage.getItem('token');
  if (!token)
    return (
      <div className="bg-gradient-hero hero-glow min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-xl"
        >
          <p className="text-white text-lg mb-4">Please log in to view profile.</p>
          <Button asChild>
            <Link to="/login">Go to Login</Link>
          </Button>
        </motion.div>
      </div>
    );

  return (
    <div className="bg-gradient-hero hero-glow min-h-screen relative overflow-hidden">
      <Navbar />
      <div className="container mx-auto px-6 py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="border-0 bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl">
            <CardHeader className="text-center">
              <div className="relative mx-auto w-28 h-28 mb-6">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover border-4 border-white/20 shadow-xl"
                />
                {editing && (
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full p-2 bg-blue-600 text-white"
                    onClick={() => alert("Avatar Upload soon!")}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {editing ? (
                <input
                  className="bg-transparent text-center text-3xl font-bold border-b border-white/30 focus:outline-none text-white"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                />
              ) : (
                <CardTitle className="text-white text-4xl">{user.name}</CardTitle>
              )}
            </CardHeader>

            <CardContent className="space-y-6 text-gray-200">
              <div className="flex items-center space-x-3">
                <Mail className="text-blue-400" />
                {editing ? (
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    className="bg-transparent border-b border-white/30 flex-1 focus:outline-none"
                  />
                ) : (
                  <span>{user.email}</span>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <User className="text-green-400" />
                <span>Username: {user.name}</span>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="text-purple-400" />
                <span>Joined: {new Date(user.created_at).toLocaleDateString()}</span>
              </div>

              <div>
                <label className="text-sm flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  Password
                </label>
                {editing ? (
                  <div className="relative mt-2">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={editData.password}
                      onChange={(e) => setEditData({ ...editData, password: e.target.value })}
                      className="bg-transparent w-full border rounded-lg p-3 pr-10 focus:outline-none"
                    />
                    <Button
                      size="icon"
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </Button>
                  </div>
                ) : (
                  <p className="bg-white/10 rounded-lg mt-2 p-3">********</p>
                )}
              </div>
            </CardContent>

            <CardFooter className="justify-center space-x-4">
              {editing ? (
                <>
                  <Button onClick={handleUpdate}>Save</Button>
                  <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
                </>
              ) : (
                <Button onClick={() => setEditing(true)} className="flex items-center space-x-2">
                  <Edit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </Button>
              )}
            </CardFooter>

          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default Profile;
