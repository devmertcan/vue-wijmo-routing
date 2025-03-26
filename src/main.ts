import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import '@mescius/wijmo.styles/wijmo.css';

import { registerGrid } from "@mescius/wijmo.vue2.grid";
import { registerGridGrouppanel } from "@mescius/wijmo.vue2.grid.grouppanel";
import { registerGridFilter } from "@mescius/wijmo.vue2.grid.filter";
import { registerGridSearch } from "@mescius/wijmo.vue2.grid.search";
import { registerInput } from "@mescius/wijmo.vue2.input";
import { registerNav } from "@mescius/wijmo.vue2.nav";
import { registerOlap } from "@mescius/wijmo.vue2.olap";
import { registerGridMultirow } from "@mescius/wijmo.vue2.grid.multirow";

// Correct Apollo Client Setup for Vue 3
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
import { provideApolloClient } from '@vue/apollo-composable';

const httpLink = createHttpLink({
    uri: "/graphiql", // Corrected syntax
    headers: {
        Authorization: "Basic " + btoa("strategic:EcP4YFUEIvZC"),
    }
});

const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

const app = createApp(App);
// Provide Apollo globally to the app
provideApolloClient(apolloClient);
// Register Wijmo Components
registerGrid(app);
registerGridGrouppanel(app);
registerGridFilter(app);
registerGridSearch(app);
registerInput(app);
registerNav(app);
registerOlap(app);
registerGridMultirow(app)

// Use Vue Router
app.use(router);
app.mount("#app");
