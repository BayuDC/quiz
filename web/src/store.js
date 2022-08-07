import { writable } from 'svelte/store';

export const auth = writable({
    pending: true,
    user: undefined,
});
