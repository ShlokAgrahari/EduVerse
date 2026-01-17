import React, { useEffect, useState } from 'react';
import { 
  LogOut, Bell, Twitter, Github, Linkedin, Users, BookOpen, Plus, User, IndianRupee, TrendingUp, Award, Clock, Star, Eye, Edit, Trash2, BarChart3
} from 'lucide-react';
import logo from './logo.png';

// Mock data for demo purposes
const mockCourses = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp',
    category: 'Web Development',
    pricing: 2999,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60',
    students: [
      { studentId: 'student1' },
      { studentId: 'student2' },
      { studentId: 'student3' }
    ],
    rating: 4.8,
    views: 1234
  },
  {
    id: 2,
    title: 'React Masterclass 2024',
    category: 'Frontend Development',
    pricing: 1999,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=60',
    students: [
      { studentId: 'student2' },
      { studentId: 'student4' }
    ],
    rating: 4.9,
    views: 892
  },
  {
    id: 3,
    title: 'Python for Data Science',
    category: 'Data Science',
    pricing: 3499,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60',
    students: [
      { studentId: 'student1' },
      { studentId: 'student5' },
      { studentId: 'student6' }
    ],
    rating: 4.7,
    views: 1567
  },
  {
    id: 4,
    title: 'UI/UX Design Fundamentals',
    category: 'Design',
    pricing: 2499,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&auto=format&fit=crop&q=60',
    students: [
      { studentId: 'student3' },
      { studentId: 'student7' }
    ],
    rating: 4.6,
    views: 743
  }
];

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState("Instructor Name");
  const [students, setStudents] = useState(0);
  const [earning, setEarnings] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // const response = await fetch('http://localhost:8000/instructor-dashboard',{
        //   method:"GET",
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   credentials:"include"
        // }); 
        // if (!response.ok) {
        //   throw new Error('Failed to fetch courses');
        // }
        // const data = await response.json();
        // setCourses(data);
        
        // const response2 = await fetch("http://localhost:8000/user", {
        //   method: "GET",
        //   credentials: "include",
        // });
        // if (!response2.ok) throw new Error("Failed to fetch user details");
        // const user = await response2.json(); 
        // setName(user.data.userName)
        setCourses(mockCourses);
        setName("Dr. Sarah Johnson");
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const calculateUniqueStudents = () => {
      const studentSet = new Set();
      courses.forEach(course => {
        if (course.students && Array.isArray(course.students)) {
          course.students.forEach(student => studentSet.add(student.studentId)); 
        }
      });
      setStudents(studentSet.size); 
    };
    calculateUniqueStudents();
  }, [courses]);

  useEffect(() => {
    const calculateEarnings = () => {
      const totalEarnings = courses.reduce(
        (total, course) => total + (course.pricing * course.students.length), 0
      );
      setEarnings(totalEarnings);
    }
    calculateEarnings();
  }, [courses]);

  const handleLogout = () => {
    alert('Logout - Backend integration pending');
  };

  const handleCreateCourse = () => {
    alert('Create New Course - Backend integration pending');
  };

  const handleEditCourse = (courseId) => {
    alert(`Edit course ${courseId} - Backend integration pending`);
  };

  const handleDeleteCourse = (courseId) => {
    alert(`Delete course ${courseId} - Backend integration pending`);
  };

  const stats = [
    { 
      icon: <Users size={28} />,
      title: 'Total Students',
      value: students,
      change: '+12%',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      trend: 'up'
    },
    {
      icon: <BookOpen size={28} />,
      title: 'Active Courses',
      value: courses.length,
      change: '+2',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      trend: 'up'
    },
    {
      icon: <IndianRupee size={28} />,
      title: 'Total Earnings',
      value: `₹${earning.toLocaleString()}`,
      change: '+18%',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      trend: 'up'
    },
    {
      icon: <Star size={28} />,
      title: 'Average Rating',
      value: '4.75',
      change: '+0.2',
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      trend: 'up'
    }
  ];

  const totalViews = courses.reduce((sum, course) => sum + (course.views || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Navbar */}
      <nav className="bg-[#03045e] shadow-xl sticky top-0 z-50 border-b border-white/10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-3">
                            <img src={logo} alt="Logo" className="w-10 h-10 rounded-lg" />
                            <span className="text-white text-2xl font-bold">EduVerse</span>
                          </div>
              <span className="hidden lg:block text-white/60 text-sm border-l border-white/20 pl-3 ml-3">Instructor Portal</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="p-2.5 text-white hover:bg-white/10 rounded-xl transition-all relative group">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <span className="absolute -bottom-8 right-0 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  3 new notifications
                </span>
              </button>
              
              <div className="flex items-center space-x-3 pl-3 border-l border-white/20">
                <div className="w-10 h-10 bg-gradient-to-br from-white to-blue-100 rounded-full flex items-center justify-center shadow-lg">
                  <User className="text-[#03045e]" size={20} />
                </div>
                <div className="hidden sm:block">
                  <div className="text-white font-semibold text-sm">{name}</div>
                  <div className="text-white/60 text-xs">Instructor</div>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="ml-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all flex items-center gap-2 font-medium"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#03045e] to-blue-600 bg-clip-text text-transparent mb-3">
              Instructor Dashboard
            </h1>
            <p className="text-slate-600 text-lg">Manage your courses and track your progress</p>
          </div>
          <button 
            onClick={handleCreateCourse}
            className="bg-gradient-to-r from-[#03045e] to-blue-600 hover:from-[#02034a] hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 group"
          >
            <Plus size={22} className="group-hover:rotate-90 transition-transform" />
            <span>Create New Course</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 border border-slate-100 group hover:-translate-y-1">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-slate-600 text-sm font-medium mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-[#03045e]">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Stats Bar
        <div className="bg-gradient-to-r from-[#03045e] to-blue-600 rounded-2xl shadow-xl p-6 mb-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Eye size={24} />
              </div>
              <div>
                <p className="text-white/80 text-sm">Total Views</p>
                <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Award size={24} />
              </div>
              <div>
                <p className="text-white/80 text-sm">Completion Rate</p>
                <p className="text-2xl font-bold">87%</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-white/80 text-sm">Growth This Month</p>
                <p className="text-2xl font-bold">+24%</p>
              </div>
            </div>
          </div>
        </div> */}

        {/* Courses Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-[#03045e]">Your Courses</h2>
            <div className="flex gap-2">
              <button className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'overview' ? 'bg-[#03045e] text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`} onClick={() => setActiveTab('overview')}>
                Overview
              </button>
              <button className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'analytics' ? 'bg-[#03045e] text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`} onClick={() => setActiveTab('analytics')}>
                Analytics
              </button>
            </div>
          </div>

          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group border border-slate-100 hover:-translate-y-1">
                  <div className="relative overflow-hidden h-48">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                      <span className="text-[#03045e] font-bold text-sm">₹{course.pricing}</span>
                    </div>
                    <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Active
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <button 
                        onClick={() => handleEditCourse(course.id)}
                        className="flex-1 bg-white text-[#03045e] py-2 rounded-lg font-semibold text-sm hover:bg-slate-100 transition-colors flex items-center justify-center gap-1"
                      >
                        <Edit size={14} />
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteCourse(course.id)}
                        className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold text-sm hover:bg-red-600 transition-colors flex items-center justify-center gap-1"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold">
                        {course.category}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star size={14} fill="currentColor" />
                        <span className="text-xs font-bold text-slate-700">{course.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-[#03045e] mb-3 line-clamp-2 min-h-[3.5rem]">
                      {course.title}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Users size={16} />
                          <span className="font-medium">{course.students.length} Students</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-600">
                          <Eye size={16} />
                          <span className="font-medium">{course.views}</span>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-slate-600 text-sm font-medium">Revenue</span>
                        <div className="flex items-center gap-1 text-emerald-600 font-bold">
                          <TrendingUp size={16} />
                          <span>₹{(course.pricing * course.students.length).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-16 text-center border border-slate-100">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen size={48} className="text-[#03045e]" />
              </div>
              <h3 className="text-2xl font-bold text-slate-700 mb-3">No courses yet</h3>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">Start creating your first course to share your knowledge and help students achieve their goals!</p>
              <button 
                onClick={handleCreateCourse}
                className="bg-gradient-to-r from-[#03045e] to-blue-600 hover:from-[#02034a] hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                <Plus size={20} />
                Create Your First Course
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#03045e] to-[#02034a] text-white mt-20 border-t border-white/10">
        <div className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl">
                  📚
                </div>
                <span className="text-white text-xl font-bold">EduVerse</span>
              </div>
              <p className="text-slate-300 text-sm">Empowering educators to create impactful learning experiences.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors text-sm">Help Center</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors text-sm">Teaching Resources</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors text-sm">Community</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors text-sm">Best Practices</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors text-sm">Contact Us</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors text-sm">FAQ</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors text-sm">Terms of Service</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Connect</h3>
              <div className="flex gap-3 mb-4">
                <a href="#" className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all hover:-translate-y-1">
                  <Twitter size={20} />
                </a>
                <a href="#" className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all hover:-translate-y-1">
                  <Github size={20} />
                </a>
                <a href="#" className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all hover:-translate-y-1">
                  <Linkedin size={20} />
                </a>
              </div>
              <p className="text-slate-300 text-sm">Follow us for updates and tips</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-slate-300 text-sm">© 2024 EduVerse Learning Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InstructorDashboard;
