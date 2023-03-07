//export const KEY_ITEM = '';

import { IUser } from '../types';

const KEY_USER = import.meta.env.VITE_KEY_USER as string;

export const StorageService = {
    setUser: (user: IUser | null) => {
        if (!user) {
            localStorage.removeItem(KEY_USER);
            return;
        }
        localStorage.setItem(KEY_USER, JSON.stringify(user));
    },
    getUser: () => {
        const json = localStorage.getItem(KEY_USER);
        if (!json) return null;

        const user = JSON.parse(json);
        return user ?? null;
    },
    removeUser: () => {
        const json = localStorage.getItem(KEY_USER);
        if (json) {
            localStorage.removeItem(KEY_USER);
        }
    },
    setItem: (item: any, key: string) => {
        localStorage.setItem(key, JSON.stringify(item));
    },
    getItem: (key: string) => {
        const json = localStorage.getItem(key);
        if (!json) return null;

        const item = JSON.parse(json);
        return item ?? null;
    },
    removeItem: (key: string) => {
        const json = localStorage.getItem(key);
        if (json) {
            localStorage.removeItem(key);
        }
    },
    clear: () => {
        localStorage.clear();
    },
};
