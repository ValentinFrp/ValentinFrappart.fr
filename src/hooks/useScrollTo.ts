import {useCallback} from 'react';

export const useScrollTo = () => {
    return useCallback((elementId: string) => {
        const element = document.getElementById(elementId);
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }, []);
};