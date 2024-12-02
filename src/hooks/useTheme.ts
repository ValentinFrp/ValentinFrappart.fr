import { useState, useEffect } from 'react';

export type Theme = 'dark' | 'light' | 'synthwave';

interface ThemeColors {
    primary: string;
    secondary: string;
    background: string;
    text: string;
}

const themes: Record<Theme, ThemeColors> = {
    dark: {
        primary: '#3B82F6',
        secondary: '#1F2937',
        background: '#0F172A',
        text: '#FFFFFF'
    },
    light: {
        primary: '#2563EB',
        secondary: '#F3F4F6',
        background: '#FFFFFF',
        text: '#1F2937'
    },
    synthwave: {
        primary: '#FF00FF',
        secondary: '#00FFFF',
        background: '#2D1B69',
        text: '#FFFFFF'
    }
};

export const useTheme = () => {
    const [theme, setTheme] = useState<Theme>('dark');

    useEffect(() => {
        const root = document.documentElement;
        const colors = themes[theme];

        Object.entries(colors).forEach(([key, value]) => {
            root.style.setProperty(`--color-${key}`, value);
        });
    }, [theme]);

    return { theme, setTheme, themes };
};