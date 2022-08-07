<script>
    import { onMount } from 'svelte';
    import { auth } from '../store';

    let render = false;

    $: {
        render = !$auth.pending;
    }

    onMount(() => {
        auth.load();
    });
</script>

{#if render}
    <slot />
{/if}
