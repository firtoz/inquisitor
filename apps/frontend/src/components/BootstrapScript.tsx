'use client';

import {useBootstrap} from "../app/useBootstrap";
import {useEffect, useMemo, useState} from "react";
import {atom, useAtom} from 'jotai';

export enum Theme {
    dark = 'dark',
    light = 'light',
    auto = 'auto',
}

export const themeAtom = atom<Theme>(Theme.auto);

export const BootstrapScript = () => {
    const [theme, setTheme] = useAtom(themeAtom);

    const prefersDark = useMemo(() => {
        return typeof window !== "undefined" && window.matchMedia(`(prefers-color-scheme: ${Theme.dark})`);
    }, []);

    useBootstrap();

    useEffect(() => {
        if (theme === Theme.auto && prefersDark.matches) {
            document.documentElement.setAttribute('data-bs-theme', Theme.dark)
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme)
        }
    }, [prefersDark, theme]);

    // detect whether browser wants dark mode
    useEffect(() => {
        const getPreferredTheme = () => {
            return prefersDark.matches ? Theme.dark : Theme.light
        }

        setTheme(getPreferredTheme())

        const onThemeChange = () => {
            setTheme(getPreferredTheme())
        };

        prefersDark.addEventListener('change', onThemeChange);

        return () => {
            prefersDark.removeEventListener('change', onThemeChange);
        }
    }, [prefersDark, setTheme]);

    return null;
}
