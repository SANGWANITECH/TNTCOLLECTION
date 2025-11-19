import VerifyForm from "@/components/auth/VerifyForm";

export default function VerifyPage(){

    return (
        <div className={'flex flex-col gap-8 text-center pt-20 px-2'}>
            <div>
                <h2>Verify Your Email</h2>
                <p>Enter the code sent to your email</p>
            </div>

            <VerifyForm/>
        </div>
    )
}