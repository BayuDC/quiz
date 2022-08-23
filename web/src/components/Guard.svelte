<script>
    import { onMount } from 'svelte';

    import { navigate } from 'svelte-navigator';
    import { auth } from '../lib/store';
    import useWs from '../lib/socket';

    $: {
        if (!$auth.user) navigate('/login');
    }

    onMount(() => {
        useWs();
    });
</script>

{#if $auth.user}
    <slot />
{/if}
