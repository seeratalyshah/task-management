"use client"
import React, { useState } from 'react';
import AuthScreen from '../auth/components/auth-screen';
import WorkspaceSelector from '@/components/workspace-selector';

const AuthURL = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log("is logged In", isLoggedIn)

  return (
    <>
      {isLoggedIn ? (
        <WorkspaceSelector />
      ) : (
        <AuthScreen onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </>
  );
};

export default AuthURL;