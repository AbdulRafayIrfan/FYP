import { useAuth } from "../../Contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Loader } from "@mantine/core";

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
      // Non-anonymous User has registered but email unverified
      if (!loading && !currentUser.isAnonymous && !currentUser.emailVerified) {
        router.replace("/setup-profile");
        return;
      }
    }, [loading, currentUser, router]);

    // Loading animation here
    if (loading)
      return (
        <div className="text-center mt-[50vh] bg-secondary">
          <Loader color="white" size="xl" />
        </div>
      );

    // Only display private page component if email is verified or is an anonymous user
    if (currentUser && (currentUser.isAnonymous || currentUser.emailVerified))
      return <Component {...props} />;
  };
}
