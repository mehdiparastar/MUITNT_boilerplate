import { LoadingContext } from 'loading/context/LoadingProvider';
import { useContext } from 'react';

type UseLoadingHookType = {
  loading: boolean,
  enableLoading: () => void,
  disableLoading: () => void
}

export const useLoading = (): UseLoadingHookType => {
  const { state: { loading }, enableLoading, disableLoading } = useContext(LoadingContext)
  return { loading, enableLoading, disableLoading }
}