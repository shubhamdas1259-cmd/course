import React from 'react';
import { Link } from 'react-router-dom';

export default function CourseCard({ course }) {
  return (
    <div className="card">
      <h3><Link to={`/courses/${course.id}`}>{course.title}</Link></h3>
      <p className="muted">{course.author?.name || course.author?.email}</p>
      <p>{course.description}</p>
    </div>
  );
}