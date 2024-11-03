// src/components/Dashboard.js

import React from 'react';
import InstructorDashboard from './InstructorDashboard';
import StudentDashboard from './StudentDashboard'; // Assume you have this component

const Dashboard = ({ userRole }) => {
  return (
    <div>
      {userRole === 'instructor' ? <InstructorDashboard /> : <StudentDashboard />}
    </div>
  );
};

export default Dashboard;
