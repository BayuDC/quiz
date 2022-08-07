<div class="alert">
    <slot />
</div>

<style lang="scss">
    @import '../styles/variable';
    .alert {
        color: $pink;
        text-align: center;
        background: rgba($pink, 0.3);
        font-weight: 600;
        padding: 10px;
    }
</style>
