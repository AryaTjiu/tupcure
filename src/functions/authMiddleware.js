import { useAuthContext } from "@/context/AuthContext"
import { useRouter } from "next/router";
import { useEffect } from "react";

export const withoutAuth = (WrappedComponent) => {
    return (props) => {
        const {user} = useAuthContext();
        const router = useRouter();

        useEffect(() => {
            if(user && user.emailVerified) {
                router.replace("/dashboard");
            } else if(user && !user.emailVerified) {
                router.replace("/verification");
            }
        }, [user])

        if(user) {
            return null;
        }

        return <WrappedComponent {...props}/>
    }
}

export const withAuth = (WrappedComponent) => {
    return (props) => {
        const {user} = useAuthContext();
        const router = useRouter();

        useEffect(() => {
            if(!user) {
                router.replace("/login");
            } else if(!user.emailVerified) {
                router.replace("/verification");
            }
        }, [user])

        if(!user) {
            return null;
        }

        return <WrappedComponent {...props}/>
    }
}