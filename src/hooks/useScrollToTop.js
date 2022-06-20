import { useEffect } from 'react';
import { useLocation } from 'react-router';

const useScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
};

export default useScrollToTop;
