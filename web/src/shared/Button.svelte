<button class="button" on:click>
    <slot />
</button>

<style lang="scss">
    @import '../styles/variable';

    .button {
        padding: 10px 20px;
        font-size: 16px;
        font-weight: 700;
        background: $black;
        color: $white;
        border: none;
        cursor: pointer;
        transition: 0.3s;

        &:hover {
            color: #fff;
        }
    }
</style>
