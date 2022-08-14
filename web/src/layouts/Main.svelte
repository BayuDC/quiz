<script>
    import { Button } from 'spaper';
    import { navigate } from 'svelte-navigator';
    import MainClear from './MainClear.svelte';
    import { auth } from '../lib/store';
</script>

<MainClear>
    <h4 class="margin-bottom">Welcome, <b>{$auth.user.fullname}</b>!</h4>
    <slot />
    <Button outline="danger" class="margin-top margin-bottom-none" size="small" on:click={() => navigate('/logout')}>
        Logout
    </Button>
</MainClear>
