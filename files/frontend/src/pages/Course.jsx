import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

export default function Course() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE}/courses/${id}`).then(r => setCourse(r.data)).catch(console.error);
  }, [id]);

  if (!course) return <div>Loading...</div>;

  return (
    <div>
      <h1>{course.title}</h1>
      <p className="muted">By {course.author?.name || course.author?.email}</p>
      <p>{course.description}</p>

      <h3>Lessons</h3>
      <ol>
        {course.lessons.map(l => (
          <li key={l.id}>
            <strong>{l.title}</strong>
            <p>{l.content}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}