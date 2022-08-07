<script>
    import Guard from '../components/Guard.svelte';
    import LayoutMain from '../layouts/Main.svelte';

    import Radio from '../shared/Radio.svelte';
</script>

<LayoutMain>
    <Guard>
        <Radio name="test" id="A" value="1">Lorem ipsum</Radio>
        <Radio name="test" id="B" value="2">Lorem, ipsum dolor.</Radio>
    </Guard>
</LayoutMain>
