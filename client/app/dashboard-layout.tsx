'use client';

import NavBar from './components/nav-bar';
import { useState } from 'react';
import styles from '@/app/styles/dashboard-layout.module.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className={styles.dashboard}>
      <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      {children}
    </div>
  );
}
