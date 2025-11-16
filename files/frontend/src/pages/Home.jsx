import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from '../components/CourseCard';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

export default function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}/courses`).then(r => setCourses(r.data)).catch(console.error);
  }, []);

  return (
    <div>
      <h1>SkillUp Courses</h1>
      <p className="muted">Minimal theme — list of courses</p>
      <div className="grid">
        {courses.map(c => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>
    </div>
  );
}