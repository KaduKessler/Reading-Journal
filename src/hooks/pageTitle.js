import { useEffect } from 'react';

const usePageTitle = (title, prefix = 'Reading Journal') => {
    useEffect(() => {
        document.title = `${title} | ${prefix}`;
    }, [title, prefix]);
};

export default usePageTitle;
