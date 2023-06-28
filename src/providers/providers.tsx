'use client';
import React from 'react';

import ToastProvider from '@/providers/ToastProvider/ToastProvider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ToastProvider>{children}</ToastProvider>;
};
