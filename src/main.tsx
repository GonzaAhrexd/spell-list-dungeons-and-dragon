import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SpendProvider } from "./features/main/context/spellSpend.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./index.css";
import App from "./App.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SpendProvider>
        <App />

        <ReactQueryDevtools />
      </SpendProvider>
    </QueryClientProvider>
  </StrictMode>,
);
