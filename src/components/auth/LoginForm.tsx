'use client'
import { NextPage } from "next";
import InputField from "@/components/Inputfield";
import {useState} from "react";
import {Button} from "@/components/ui/button";


const LoginForm: NextPage = () => {
    const [email, setEmail] = useState<string>('')
    return (
            <form className={'card w-full max-w-xl mx-auto'}>
                <div className={'flex flex-col text-start gap-1 mb-4'}>
                <label className={'font-medium'}>Email</label>
                <InputField
                    type={'text'}
                    placeholder={'admin@gmail.com'}
                    className={'p-2'}
                    required
                    value={email}
                    onChange = {(e:React.ChangeEvent<HTMLInputElement>)=> setEmail(e.target.value)}
                />
                </div>

                <div>
                    <Button variant={'primary'}>Sign In</Button>
                </div>

                <div className={'flex items-center my-4'}>
                    <div className={'flex-grow border-t border-border-light dark:border-border-dark'}/>
                    <span>Or</span>
                    <div className={'flex-grow border-t border-border-light dark:border-border-dark'}/>
                </div>

                <div className={'flex justify-center'}>
                    <Button className="flex items-center gap-2 border border-border-light dark:border-border-dark w-full sm:w-fit">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            width="24px"
                            height="24px"
                        >
                            <path
                                fill="#4285F4"
                                d="M24 9.5c3.94 0 6.7 1.71 8.26 3.14l6.05-6.05C34.46 3.58 29.73 1.5 24 1.5 14.73 1.5 7.02 7.64 4.1 15.9l7.04 5.47C12.3 15.06 17.73 9.5 24 9.5z"
                            />
                            <path
                                fill="#34A853"
                                d="M46.5 24.5c0-1.63-.15-3.18-.43-4.68H24v9.18h12.7c-.55 2.96-2.2 5.46-4.7 7.14l7.2 5.6c4.2-3.88 7.3-9.6 7.3-17.24z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M11.14 28.37c-1.02-2.96-1.02-6.28 0-9.24l-7.04-5.47C2.02 17.36 1.5 20.6 1.5 24c0 3.4.52 6.64 2.6 10.34l7.04-5.97z"
                            />
                            <path
                                fill="#EA4335"
                                d="M24 46.5c6.48 0 11.92-2.14 15.9-5.82l-7.2-5.6c-2.02 1.38-4.6 2.2-8.7 2.2-6.27 0-11.7-5.56-12.86-12.1l-7.04 5.97C7.02 40.36 14.73 46.5 24 46.5z"
                            />
                        </svg>
                        Continue with Google
                    </Button>
                </div>
            </form>
    )
}

export default LoginForm;