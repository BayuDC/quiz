import { writable } from 'svelte/store';
import axios from './axios';

function createAuth() {
    const { subscribe, set } = writable({
        pending: true,
        user: undefined,
    });

    return {
        subscribe,
        load() {
            set({ pending: true, user: undefined });
            axios
                .get('/auth')
                .then(({ data }) => {
                    set({ pending: false, user: data.user });
                })
                .catch(() => {
                    set({ pending: false, user: undefined });
                });
        },
        unload() {
            set({ pending: false, user: undefined });
        },
    };
}

export const auth = createAuth();

export const loading = writable(false);
