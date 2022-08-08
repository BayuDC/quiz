<script>
    import LayoutMain from '../layouts/Main.svelte';
    import Radio from '../shared/Radio.svelte';

    export let question;
</script>

<LayoutMain>
    <h4>{question.body}</h4>
    <form action="">
        {#each question.choices as choice, i}
            <Radio name="answer" id={String.fromCharCode(i + 65)} value="1">{choice.body}</Radio>
        {/each}
    </form>
</LayoutMain>

<style lang="scss">
    form {
        margin: 30px 0;
    }
</style>
