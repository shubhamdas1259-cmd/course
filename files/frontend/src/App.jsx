import React from 'react';
import Header from './components/Header';

export default function App({ children }) {
  return (
    <div>
      <Header />
      <main style={{ padding: '1rem', maxWidth: 980, margin: '0 auto' }}>{children}</main>
    </div>
  );
}