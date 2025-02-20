import React, { useState } from 'react'
import { useAuthContext } from './UseAuthContext'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null) // Corrected this to set `null` instead of 'null'

    try {
      const response = await fetch('https://workout-buddy-beryl.vercel.app/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      
      const json = await response.json()

      if (!response.ok) {
        console.error("Signup Error Response:", json);
        setError(json.error || "Something went wrong");
        setIsLoading(false);
        return;
      }

      // Save the user to the local storage
      localStorage.setItem('user', JSON.stringify(json))

      // Update the auth context
      dispatch({ type: 'LOGIN', payload: json })

      setIsLoading(false)

      return json; // Returning the response so that we can handle it in the component
    } catch (err) {
      console.error("Signup Error:", err);
      setError("An unexpected error occurred");
      setIsLoading(false);
    }
  }

  return { error, isLoading, login }
}
