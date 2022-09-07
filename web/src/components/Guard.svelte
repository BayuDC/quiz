<script>
    import { onMount, onDestroy } from 'svelte';

    import { navigate } from 'svelte-navigator';
    import { auth } from '../lib/store';
    import useWs from '../lib/socket';

    $: {
        if (!$auth.user) navigate('/login');
    }

    let socket;

    onMount(() => {
        socket = useWs();
    });
    onDestroy(() => {
        socket?.close();
    });
</script>

{#if $auth.user}
    <slot />
{/if}
