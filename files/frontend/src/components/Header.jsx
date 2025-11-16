import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="brand">SkillUp</Link>
        <nav>
          <Link to="/">Courses</Link>
        </nav>
      </div>
    </header>
  );
}