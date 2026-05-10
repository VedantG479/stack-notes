import { useState } from "react"

export default function LoginPage() {
    const [isSignup, setIsSignup] = useState(false)

    return (
        <main className="min-h-screen bg-[#0B0D14] text-[#E7E4DF]">
            <div className="max-w-[520px] pl-24 pt-32">
                {/* Header */}
                <section className="mb-20">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#6C717B] mb-6">
                        {isSignup ? "Create Account" : "Login"}
                    </p>
                    <p className="text-[14px] leading-[1.9] text-[#727782]">
                        {isSignup
                            ? "Create an account to publish articles and manage drafts."
                            : "Login to continue writing and managing your articles."
                        }
                    </p>
                </section>

                {/* Form */}
                <section className="space-y-12">
                    {/* Name */}
                    {isSignup && (
                        <div>
                            <p className="text-[11px] uppercase tracking-[0.18em] text-[#6C717B] mb-4">
                                Name
                            </p>
                            <input
                                type="text"
                                placeholder="Vedant"
                                className="
                                    w-full
                                    bg-transparent
                                    border-none
                                    border-b
                                    border-[#171B26]
                                    pb-4
                                    outline-none
                                    text-[14px]
                                    placeholder:text-[#4D5462]
                                    focus:border-[#FF5C8A]
                                    transition-colors
                                "
                            />
                        </div>
                    )}

                    {/* Email */}
                    <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-[#6C717B] mb-4">
                            Email
                        </p>
                        <input
                            type="email"
                            placeholder="vedant@stack-notes.dev"
                            className="
                                w-full
                                bg-transparent
                                border-none
                                border-b
                                border-[#171B26]
                                pb-4
                                outline-none
                                text-[14px]
                                placeholder:text-[#4D5462]
                                focus:border-[#FF5C8A]
                                transition-colors
                            "
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
                            className="
                                w-full
                                bg-transparent
                                border-none
                                border-b
                                border-[#171B26]
                                pb-4
                                outline-none
                                text-[14px]
                                placeholder:text-[#4D5462]
                                focus:border-[#FF5C8A]
                                transition-colors
                            "
                        />
                    </div>
                </section>

                {/* Actions */}
                <section className="mt-20 flex items-center gap-10 text-[13px]">
                    <button className="text-[#FF5C8A] hover:underline underline-offset-4">
                        {isSignup ? "create account" : "login"}
                    </button>
                    <button className="text-[#727782] hover:text-[#FF5C8A] transition-colors">
                        cancel
                    </button>
                </section>

                {/* Toggle */}
                <section className="mt-16 text-[13px] text-[#727782]">
                    {isSignup ? (
                        <p>
                            already have an account?{" "}

                            <button
                                onClick={() => setIsSignup(false)}
                                className="text-[#FF5C8A] hover:underline underline-offset-4"
                            >
                                login
                            </button>
                        </p>
                    ) : (
                        <p>
                            don&apos;t have an account?{" "}

                            <button
                                onClick={() => setIsSignup(true)}
                                className="text-[#FF5C8A] hover:underline underline-offset-4"
                            >
                                create one
                            </button>
                        </p>
                    )}
                </section>
            </div>
        </main>
    )
}