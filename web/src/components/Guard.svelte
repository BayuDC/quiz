<script>
    import { navigate } from 'svelte-navigator';
    import { auth } from '../store';

    $: {
        if (!$auth.user) navigate('/login');
    }
</script>

<slot />
