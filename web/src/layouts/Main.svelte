<script>
    import { Button } from 'spaper';
    import MainClear from './MainClear.svelte';
    import { auth } from '../lib/store';
</script>

<MainClear>
    <h4 class="margin-bottom">Welcome, <b>{$auth.user.fullname}</b>!</h4>
    <slot />
    <Button outline="danger" class="margin-top" size="small">Logout</Button>
</MainClear>
