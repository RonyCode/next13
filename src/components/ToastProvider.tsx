'use client';

import React from 'react';
import { ToastContainer, Slide, Bounce } from 'react-toastify';

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer position="top-right" transition={Bounce} />
    </>
  );
}
