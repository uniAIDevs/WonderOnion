import { useState } from 'react';
import { ErrorType } from '../types';

const useResponseState = () => {
  const [responseState, setResponseState] = useState<{
    isError?: boolean;
    isSuccess?: boolean;
    error?: ErrorType;
    isLoading?: boolean;
  }>({});

  const loading = () => {
    setResponseState({
      ...responseState,
      isLoading: true,
    });
  };

  const success = () => {
    setResponseState({
      ...responseState,
      isSuccess: true,
      isError: false,
      isLoading: false,
    });
  };

  const hasError = (error: ErrorType) => {
    setResponseState({
      error,
      isSuccess: false,
      isError: true,
      isLoading: false,
    });
  };

  return {
    ...responseState,
    loading,
    success,
    hasError,
  };
};

export default useResponseState;
