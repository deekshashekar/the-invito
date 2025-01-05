import { createFileRoute } from "@tanstack/react-router";
import AddEvents from "../components/AddEvent";
import AuthGuard from "../components/AuthGuard";

export const Route = createFileRoute("/add-event")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <AuthGuard>
        <AddEvents />
      </AuthGuard>
    </div>
  );
}
