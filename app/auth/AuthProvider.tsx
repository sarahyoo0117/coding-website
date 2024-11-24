'use client';

import { FunctionComponent, ReactNode } from 'react';
import {AuthContext, User} from './AuthContext';

export interface AuthProviderProps {
  user: User | null;
  children: ReactNode;
}

export const AuthProvider: FunctionComponent<AuthProviderProps> = ({
  user,
  children
}) => {
  return (
    <AuthContext.Provider
      value={{
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};