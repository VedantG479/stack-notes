import { useState } from "react"
import { useForm } from "react-hook-form"
import auth from "../appwrite/auth"
import userDB from "../appwrite/user"
import { useDispatch } from "react-redux"
import { login } from "../store/authSlice"
import { useNavigate } from "react-router"

export default function LoginPage() {
    const [isSignup, setIsSignup] = useState(false)
    const { register, handleSubmit, reset } = useForm()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = async (data) => {
        try {
            if (isSignup) {
                const { username, intro, email, password, github, twitter, linkedin } = data

                await auth.createAccount(username, email, password)
                await userDB.createUser(username, intro, github, twitter, linkedin, email)
            }
            else {
                const { email, password } = data

                await auth.loginAccount(email, password)
            }

            const user = await auth.getCurrentUser()
            if (user) dispatch(login(user.$id))
            navigate('/')
        }
        catch (error) {
            console.log(isSignup ? 'error creating account: ' : 'error logging in account: ', error)
        }
    }

    return (
        <main className="min-h-screen bg-[#0B0D14] text-[#E7E4DF]">
            <div className="max-w-[640px] pl-24 pt-24">
                {/* Header */}
                <section className="mb-20 flex items-center">
                    <button className="text-[12px] text-[#727782] hover:text-[#FF5C8A] transition-colors"
                        onClick={() => navigate('/')}>
                        ← back
                    </button>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#6C717B] ml-16">
                        {isSignup ? "Create Account" : "Login"}
                    </p>
                </section>

                {/* Form */}
                <form onSubmit={handleSubmit(submitHandler)}>
                    {isSignup ? (
                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-10">
                                <div>
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#6C717B] mb-4">
                                        Name
                                    </p>
                                    <input
                                        type="text"
                                        placeholder="Vedant"
                                        autoComplete="on"
                                        className="w-full bg-transparent border-none border-b border-[#171B26] pb-4 outline-none text-[14px] placeholder:text-[#4D5462] focus:border-[#FF5C8A] transition-colors"
                                        {...register("username", { required: true })}
                                    />
                                </div>
                                <div>
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#6C717B] mb-4">
                                        About you
                                    </p>
                                    <input
                                        type="text"
                                        placeholder="dev @atlassian"
                                        autoComplete="off"
                                        minLength="5"
                                        maxLength="50"
                                        className="w-full bg-transparent border-none border-b border-[#171B26] pb-4 outline-none text-[14px] placeholder:text-[#4D5462] focus:border-[#FF5C8A] transition-colors"
                                        {...register("intro", {
                                            required: true,
                                            minLength: 5,
                                            maxLength: 50
                                        })}
                                    />
                                </div>
                                <div>
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#6C717B] mb-4">
                                        Email
                                    </p>
                                    <input
                                        type="email"
                                        placeholder="vedant@stack-notes.dev"
                                        autoComplete="on"
                                        className="w-full bg-transparent border-none border-b border-[#171B26] pb-4 outline-none text-[14px] placeholder:text-[#4D5462] focus:border-[#FF5C8A] transition-colors"
                                        {...register("email", {
                                            required: true,
                                            pattern: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim
                                        })}
                                    />
                                </div>
                                {/* Password */}
                                <div>
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#6C717B] mb-4">
                                        Password
                                    </p>
                                    <input
                                        type="password"
                                        placeholder="••••••••••••"
                                        autoComplete="off"
                                        className="w-full bg-transparent border-none border-b border-[#171B26] pb-4 outline-none text-[14px] placeholder:text-[#4D5462] focus:border-[#FF5C8A] transition-colors"
                                        {...register("password", {
                                            required: true,
                                            minLength: 6
                                        })}
                                    />
                                </div>
                            </div>
                            {/* RIGHT */}
                            <div className="space-y-10 ml-16">
                                {/* Github */}
                                <div>
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#6C717B] mb-4">
                                        Github
                                    </p>
                                    <input
                                        type="text"
                                        placeholder="github profile url"
                                        autoComplete="off"
                                        className="w-full bg-transparent border-none border-b border-[#171B26] pb-4 outline-none text-[14px] placeholder:text-[#4D5462] focus:border-[#FF5C8A] transition-colors"
                                        {...register("github")}
                                    />
                                </div>
                                {/* Twitter */}
                                <div>
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#6C717B] mb-4">
                                        Twitter
                                    </p>
                                    <input
                                        type="text"
                                        placeholder="twitter profile url"
                                        autoComplete="off"
                                        className="w-full bg-transparent border-none border-b border-[#171B26] pb-4 outline-none text-[14px] placeholder:text-[#4D5462] focus:border-[#FF5C8A] transition-colors"
                                        {...register("twitter")}
                                    />
                                </div>
                                {/* LinkedIn */}
                                <div>
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#6C717B] mb-4">
                                        LinkedIn
                                    </p>
                                    <input
                                        type="text"
                                        placeholder="linkedin profile url"
                                        autoComplete="off"
                                        className="w-full bg-transparent border-none border-b border-[#171B26] pb-4 outline-none text-[14px] placeholder:text-[#4D5462] focus:border-[#FF5C8A] transition-colors"
                                        {...register("linkedin")}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-12 max-w-[520px]">
                            {/* Email */}
                            <div>
                                <p className="text-[11px] uppercase tracking-[0.18em] text-[#6C717B] mb-4">
                                    Email
                                </p>
                                <input
                                    type="email"
                                    placeholder="vedant@stack-notes.dev"
                                    autoComplete="on"
                                    className="w-full bg-transparent border-none border-b border-[#171B26] pb-4 outline-none text-[14px] placeholder:text-[#4D5462] focus:border-[#FF5C8A] transition-colors"
                                    {...register("email")}
                                />
                            </div>
                            {/* Password */}
                            <div>
                                <p className="text-[11px] uppercase tracking-[0.18em] text-[#6C717B] mb-4">
                                    Password
                                </p>
                                <input
                                    type="password"
                                    placeholder="••••••••••••"
                                    autoComplete="off"
                                    className="w-full bg-transparent border-none border-b border-[#171B26] pb-4 outline-none text-[14px] placeholder:text-[#4D5462] focus:border-[#FF5C8A] transition-colors"
                                    {...register("password")}
                                />
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <section className="mt-20 flex items-center gap-10 text-[13px]">
                        <button
                            className="text-[#FF5C8A] hover:underline underline-offset-4"
                            type="submit">
                            {isSignup ? "create account" : "login"}
                        </button>
                        <button
                            className="text-[#727782] hover:text-[#FF5C8A] transition-colors"
                            onClick={() => reset()}
                            type="button">
                            cancel
                        </button>
                    </section>
                </form>

                <section className="mt-8 text-[13px] text-[#727782] mb-8">
                    {isSignup ? (
                        <p>
                            already have an account?{" "}
                            <button
                                onClick={() => setIsSignup(false)}
                                className="text-[#FF5C8A] hover:underline underline-offset-4">
                                login
                            </button>
                        </p>
                    ) : (
                        <p>
                            don&apos;t have an account?{" "}

                            <button
                                onClick={() => setIsSignup(true)}
                                className="text-[#FF5C8A] hover:underline underline-offset-4">
                                create one
                            </button>
                        </p>
                    )}
                </section>
            </div>
        </main>
    )
}