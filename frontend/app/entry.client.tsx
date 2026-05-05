import { makeClient } from "./apollo";
import { ApolloProvider } from "@apollo/client/react";
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";
import { Provider } from "react-redux";
import { store } from "./store";

startTransition(() => {
  const client = makeClient();
  hydrateRoot(
    document,
    <StrictMode>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <HydratedRouter />
        </ApolloProvider>
      </Provider>
    </StrictMode>,
  );
});
