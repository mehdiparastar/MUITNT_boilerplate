
import { useCallback } from 'react';
import useAuth from './useAuth';

const useLoadingFetch = () => {
    const { loadingFetch: loading, setLoadingFetch } = useAuth();

    const handleLoading = useCallback((bool: boolean) => {
        setLoadingFetch(bool)
    }, [setLoadingFetch])

    return ({ loading, handleLoading });
};

export default useLoadingFetch;
