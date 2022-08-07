<script>
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-navigator';
    import { auth } from '../store';
    import axios from '../lib/axios';

    onMount(async () => {
        try {
            auth.set({ pending: true, user: undefined });
            const { data } = await axios.get('/auth');
            auth.set({ pending: false, user: data.user });
        } catch (err) {
            auth.set({ pending: false, user: undefined });
            navigate('/login');
        }
    });
</script>

<slot />
