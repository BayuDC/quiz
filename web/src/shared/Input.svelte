<script>
    export let label;
    export let name;
    export let type = 'text';
    export let required = false;
</script>

<div class="input-field">
    <label for={name}>{label}</label>
    <input id={name} {name} {type} {required} autocomplete="off" />
</div>

<style lang="scss">
    @import '../styles/variable';

    .input-field {
        display: flex;
        flex-direction: column;
        margin-bottom: 15px;

        label {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 5px;
        }
        input {
            border: 2px solid rgba($black, 0.4);
            background: $white;
            padding: 8px 10px;
            width: 100%;
            font-size: 14px;
            box-sizing: border-box;
            line-height: 20px;
            font-weight: 500;
            transition: 0.3s;

            &:focus {
                border-color: $black;
                outline-color: $black;
            }
        }
    }
</style>
