<script>
    import { navigate } from 'svelte-navigator';
    import { auth } from '../lib/store';

    $: {
        if (!$auth.user) navigate('/login');
    }
</script>

{#if $auth.user}
    <slot />
{/if}
