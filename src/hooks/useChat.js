import { useState, useCallback } from 'react';

export function useChat() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (message) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        throw new Error('فشل في إرسال الرسالة');
      }

      const data = await res.json();
      
      if (!data.success) {
        throw new Error(data.message || 'حدث خطأ');
      }

      return data.message;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    sendMessage,
    isLoading,
    error,
  };
}