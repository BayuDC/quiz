<script>
    import { onDestroy } from 'svelte';
    import { navigate } from 'svelte-navigator';
    import { Form, Input, Button, Alert } from 'spaper';
    import { auth, loading } from '../lib/store';
    import axios from '../lib/axios';

    import LayoutCard from '../layouts/Card.svelte';

    let error = '';

    const handleSubmit = async e => {
        try {
            loading.set(true);
            await axios.post('/auth/login', {
                username: e.target['username'].value,
                password: e.target['password'].value,
            });

            auth.load();
            navigate('/', { replace: true });
        } catch (err) {
            error = err.response?.data?.message || 'Something went wrong';
        } finally {
            loading.set(false);
        }
    };

    onDestroy(
        auth.subscribe(value => {
            if (value.user) navigate('/', { replace: true });
        })
    );
</script>

<LayoutCard>
    <Form class="margin-bottom-none margin-top" on:submit={handleSubmit}>
        <div class="margin-bottom">
            <Input name="username" type="text" label="Username" block={true} required class="margin-bottom-small" />
            <Input name="password" type="password" label="Password" block={true} required class="margin-bottom-small" />
        </div>
        {#if error}
            <Alert type="danger">{error}</Alert>
        {/if}

        <div class="row flex-right margin-none">
            <Button class="col margin-bottom-none" type="secondary">Login</Button>
        </div>
    </Form>
</LayoutCard>
