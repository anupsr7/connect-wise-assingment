"use client"

import React, { useState, createContext, useContext, ReactNode } from 'react';
interface SelectedUser {
  userId: number | undefined;
  setSelectedUserId: (value: number) => void;
}

const SelectedUserContext = createContext<SelectedUser | null>(null);
interface SelectedUserProviderProps {
  children: ReactNode;
}

export const SelectedUserProvider: React.FC<SelectedUserProviderProps> = ({ children }) => {
  const [userId, setSelectedUserId] = useState<number | undefined>();

  return (
    <SelectedUserContext.Provider value={{ userId, setSelectedUserId }}>
      {children}
    </SelectedUserContext.Provider>
  );
};

export const useSelectedUser = (): SelectedUser => {
  const context = useContext(SelectedUserContext);
  if (!context) {
    throw new Error('useSelectedUser must be used within a SelectedUserProvider');
  }
  return context;
};
