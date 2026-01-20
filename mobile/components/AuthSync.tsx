import { useAuth, useUser } from "@clerk/clerk-expo";
import { useEffect, useRef } from "react";
import { useAuthCallback } from "../hooks/useAuthentication";

const AuthSync = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { mutate: syncUser } = useAuthCallback();
  const hasSynced = useRef(false);

  useEffect(() => {
    if (isSignedIn && user && !hasSynced.current) {
      hasSynced.current = true;

      syncUser(undefined, {
        onSuccess: (data) => {
          console.log("User synced in backend: ", data.name);
        },

        onError: (data) => {
          console.log("User synced in failed for user: ", data);
        },
      });
    }

    if (!isSignedIn) {
      hasSynced.current = false;
    }
  }, [isSignedIn, user, syncUser]);

  return null;
};

export default AuthSync;
