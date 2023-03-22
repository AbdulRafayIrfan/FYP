import { useAuth } from "../../Contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function protectedPage(Component) {
  return function ProtectedPage(props) {
    const { currentUser, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      // User is not signed in after credentials checked
      if (!loading && !currentUser) {
        router.replace("/login");
        return;
      }
      // User has registered but email unverified
      if (!loading && !currentUser.emailVerified) {
        router.replace("/setup-profile");
        return;
      }
    }, [loading, currentUser, router]);

    // Loading animation here
    if (loading) return <div>Loading...</div>;

    // Only display private page component if email is verified
    return currentUser.emailVerified && <Component {...props} />;
  };
}
