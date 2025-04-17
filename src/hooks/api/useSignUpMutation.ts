import { useCallback } from 'react';
import { UserPostDTO } from '../../types/signup';

export function useSignUpMutation() {
  const mutate = useCallback(async (data: UserPostDTO) => {
    try {
      // TODO: Implement actual API call
      console.log('Sign up mutation with data:', data);
      return true;
    } catch (error) {
      console.error('Sign up mutation error:', error);
      throw error;
    }
  }, []);

  return mutate;
}
