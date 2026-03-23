import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RIABWebsite from "./pages/RIABWebsite";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RIABWebsite />
      <Toaster />
    </QueryClientProvider>
  );
}
