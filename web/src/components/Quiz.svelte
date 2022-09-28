<script>
    import { createEventDispatcher } from 'svelte';
    import { Form, Radio, Button, Skeleton } from 'spaper';
    import SvelteMarkdown from 'svelte-markdown';
    import { loading } from '../lib/store';
    import axios from '../lib/axios';

    import LayoutMain from '../layouts/MainClear.svelte';

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
    <div class="quiz">
        <Form class="margin-none" on:submit={handleSubmit}>
            {#if $loading}
                <Skeleton --height="2rem" />
                <Skeleton --height="2rem" --width="20rem" />
                <fieldset class="form-group ">
                    <Skeleton --width="10rem" />
                    <Skeleton --width="12rem" />
                    <Skeleton --width="8rem" />
                </fieldset>
                <div class="row flex-right margin-none">
                    <Skeleton --height="3rem" --width="4rem" />
                </div>
            {:else}
                <legend class="padding-bottom">
                    <SvelteMarkdown source={question.body} />
                </legend>
                <fieldset class="form-group ">
                    {#each question.choices as choice}
                        <Radio name="answer" value={choice.id} required>
                            {@html choice.body}
                        </Radio>
                    {/each}
                </fieldset>
                <div class="row flex-right margin-none">
                    <Button class="margin-none" outline="primary">Next</Button>
                </div>
            {/if}
        </Form>
    </div>
</LayoutMain>

<style lang="scss">
    .quiz {
        legend {
            font-size: 24px;
            font-weight: 600;

            & > :global(*) {
                margin-bottom: 20px;
            }
            & > :global(*):last-child {
                margin-bottom: 0;
            }
        }
        fieldset {
            & :global(span) {
                display: flex;
            }
        }
    }
</style>
