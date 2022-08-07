<script>
    import Input from '../shared/Input.svelte';
    import Button from '../shared/Button.svelte';

    const handleSubmit = () => {
        console.log('Hello');
    };
</script>

<div class="login">
    <form on:submit|preventDefault={handleSubmit}>
        <h1>TheQuiz</h1>
        <hr />

        <Input label="Username" name="txt-username" required />
        <Input label="Password" name="txt-password" required type="password" />

        <Button>Login</Button>
    </form>
</div>

<style lang="scss">
    @import '../styles/mixin';
    @import '../styles/variable';

    .login {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        form {
            background: #fff;
            padding: 20px;
            width: 100%;
            max-width: 360px;

            h1 {
                font-size: 28px;
                padding: 10px 0;
                text-align: center;
            }

            & :global(button) {
                margin-top: 25px;
                margin-left: auto;
            }
        }

        hr {
            margin-bottom: 20px;
        }
    }
</style>
