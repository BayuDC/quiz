<script>
    export let name;
    export let id;
    export let value;
</script>

<div class="radio-field">
    <input type="radio" {name} id={'radion-' + id} {value} />
    <label for={'radion-' + id} data-content={id}>
        <slot />
    </label>
</div>

<style lang="scss">
    @import '../styles/variable';

    .radio-field {
        input {
            appearance: none;

            &:checked + label::before {
                background: $black;
                color: $white;
                font-weight: 700;
            }
        }

        label {
            display: flex;
            align-items: center;
            gap: 15px;

            &::before {
                content: attr(data-content);
                padding: 8px;
                border: 2px solid $black;

                font-weight: 400;
                width: 20px;
                text-align: center;
                flex-shrink: 0;
                align-self: start;

                transition: 0.3s;
                cursor: pointer;
            }

            margin-bottom: 20px;
        }
    }
</style>
