import { useRouter } from "@tanstack/react-router";
import { useAuthStore } from "../stores/authStore";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children } : AuthGuardProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  if (!user) {
    router.navigate({ to: "/" });
    return null;
  }
  return children;
}
