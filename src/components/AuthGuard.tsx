import { useRouter } from "@tanstack/react-router";
import { useAuthStore } from "../stores/authStore";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  if (!user) {
    router.navigate({ to: "/" });
    return null;
  }
  return children;
}
