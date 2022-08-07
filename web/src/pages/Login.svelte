<script>
    import axios from '../lib/axios';
    import LayoutCard from '../layouts/Card.svelte';

    import Input from '../shared/Input.svelte';
    import Button from '../shared/Button.svelte';

    let loading = false;

    const handleSubmit = async e => {
        try {
            loading = true;
            const response = await axios.post('/auth/login', {
                username: e.target['txt-username'].value,
                password: e.target['txt-password'].value,
            });

            console.log(response);
        } catch (err) {
            console.log(err);
        } finally {
            loading = false;
        }
    };
</script>

<LayoutCard {loading}>
    <form on:submit|preventDefault={handleSubmit} disabled>
        <Input label="Username" name="txt-username" required />
        <Input label="Password" name="txt-password" required type="password" />

        <Button>Login</Button>
    </form>
</LayoutCard>
