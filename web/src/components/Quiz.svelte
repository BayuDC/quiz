<script>
    import { createEventDispatcher } from 'svelte';
    import { Form, Radio, Button, Alert } from 'spaper';
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
            <legend class="padding-bottom">{question.body}</legend>
            <fieldset class="form-group ">
                {#each question.choices as choice}
                    <Radio name="answer" value={choice.id} label={choice.body} required />
                {/each}
            </fieldset>
            <div class="row flex-right margin-none">
                <Button class="margin-none" outline="primary">Next</Button>
            </div>
        </Form>
    </div>
</LayoutMain>

<style lang="scss">
    .quiz {
        legend {
            font-size: 24px;
            font-weight: 600;
        }
    }
</style>
