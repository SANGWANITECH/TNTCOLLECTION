import LoginForm from "@/components/auth/LoginForm";
import { NextPage } from "next";

const Login: NextPage = async () => {

    return (
        <div className="text-center flex flex-col gap-8 px-4 pt-20">
            <div className={'flex flex-col gap-2'}>
                <h3 className="text-h3">Welcome back</h3>
                <p className="text-small text-text-secondary text-balance">
                    Sign in to your account to continue Admin dashboard
                </p>
            </div>

            <LoginForm />

            <p className="text-small text-text-secondary text-balance">
                If you’re not an admin, you cannot sign in here.
            </p>
        </div>
    )
}

export default Login;