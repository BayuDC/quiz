<script>
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-navigator';
    import { loading, auth } from '../lib/store';
    import axios from '../lib/axios';
    import Guard from '../components/Guard.svelte';

    onMount(async () => {
        loading.set(true);
        try {
            await axios.post('/auth/logout');
            auth.unload();
        } catch {}
        loading.set(false);
        navigate('/login');
    });
</script>

<Guard />
