<script>
    import LayoutCard from '../layouts/Card.svelte';

    import Input from '../shared/Input.svelte';
    import Button from '../shared/Button.svelte';

    const handleSubmit = () => {
        console.log('Hello');
    };
</script>

<LayoutCard>
    <form on:submit|preventDefault={handleSubmit}>
        <Input label="Username" name="txt-username" required />
        <Input label="Password" name="txt-password" required type="password" />

        <Button>Login</Button>
    </form>
</LayoutCard>
