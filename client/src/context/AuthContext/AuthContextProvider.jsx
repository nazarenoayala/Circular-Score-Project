import React from 'react'
import { AuthContext } from './AuthContext'

export const AuthContextProvider = ({children}) => {
  return (
    <>
      <AuthContext.Provider>
        {children}
      </AuthContext.Provider>
    </>
  )
}
