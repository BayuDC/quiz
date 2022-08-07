<script>
    import { onDestroy } from 'svelte';
    import { navigate } from 'svelte-navigator';
    import { auth } from '../store';
    import axios from '../lib/axios';

    import LayoutCard from '../layouts/Card.svelte';

    import Input from '../shared/Input.svelte';
    import Alert from '../shared/Alert.svelte';
    import Button from '../shared/Button.svelte';

    let loading = false;
    let error = '';

    const handleSubmit = async e => {
        try {
            loading = true;
            await axios.post('/auth/login', {
                username: e.target['txt-username'].value,
                password: e.target['txt-password'].value,
            });

            auth.load();
            navigate('/', { replace: true });
        } catch (err) {
            error = err.response.data.message || 'Something went wrong';
        } finally {
            loading = false;
        }
    };

    onDestroy(
        auth.subscribe(value => {
            if (value.user) navigate('/', { replace: true });
        })
    );
</script>

<LayoutCard {loading}>
    <form on:submit|preventDefault={handleSubmit} disabled>
        <Input label="Username" name="txt-username" required />
        <Input label="Password" name="txt-password" required type="password" />
        {#if error}
            <Alert>{error}</Alert>
        {/if}
        <Button>Login</Button>
    </form>
</LayoutCard>
