import { createFileRoute } from "@tanstack/react-router";
import ViewEvents from "../components/ViewEvents";

export const Route = createFileRoute("/view-events")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <ViewEvents />
    </div>
  );
}
