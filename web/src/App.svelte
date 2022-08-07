<script>
    import { Router, Route } from 'svelte-navigator';
    import Container from './components/Container.svelte';
    import Login from './pages/Login.svelte';
    import Root from './pages/Root.svelte';
</script>

<main>
    <Container>
        <Router>
            <Route path="/" component={Root} />
            <Route path="/login" component={Login} />
        </Router>
    </Container>
</main>
