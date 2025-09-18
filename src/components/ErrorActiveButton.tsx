'use client'
 
import { useState } from 'react'
import { Button } from '@/components/ui/button';

export function ErrorActiveButton () {
   const [error, setError] = useState<Error | null>(null)
 
  const handleClick = () => {
    try {
      throw new Error('Test Error')
    } catch (reason) {
      setError(reason as Error)
    }
  }
 
  if (error) {
    throw error
  }
 
  return (
    <Button variant="ghost" onClick={handleClick}>
      Test Error
    </Button>
  )
}