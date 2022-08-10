<script>
    import { createEventDispatcher } from 'svelte';
    import LayoutMain from '../layouts/Main.svelte';
    import { loading } from '../lib/store';
    import axios from '../lib/axios';

    import Radio from '../shared/Radio.svelte';
    import Button from '../shared/Button.svelte';

    export let question;

    const dispatch = createEventDispatcher();

    const handleSubmit = async e => {
        loading.set(true);
        try {
            await axios.post('/quiz', {
                answer: e.target['answer'].value,
            });
        } finally {
            dispatch('next');
        }
        loading.set(false);
    };
</script>

<LayoutMain>
    <h4>{question.body}</h4>
    <form on:submit|preventDefault={handleSubmit}>
        {#each question.choices as choice, i}
            <Radio name="answer" id={String.fromCharCode(i + 65)} value={choice.id}>{choice.body}</Radio>
        {/each}
        <hr />
        <Button>Next</Button>
    </form>
</LayoutMain>

<style lang="scss">
    form {
        margin: 30px 0;
        & :global(button) {
            margin-top: 20px;
            margin-left: auto;
        }
    }
</style>
