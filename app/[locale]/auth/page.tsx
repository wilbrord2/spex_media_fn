"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useActionState } from "react";
import {
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineEnvelope,
} from "react-icons/hi2";
import Navbar from "../components/nav/navbar";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  getUser,
  registerUser,
  loginUser,
  verifyEmail,
} from "@/app/actions/auth";
import { SignUpSchema, SignInSchema } from "@/lib/dto";
import { useAppContext } from "../context"; // Add this import

type AuthMode = "signin" | "signup";

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const router = useRouter();

  const { profile, setProfile } = useAppContext(); // Add this

  // Main Auth Action (Login/Register)
  const [authState, authAction, isAuthPending] = useActionState(
    async (previousState: unknown, formData: FormData) => {
      setFormErrors({});

      const validationData =
        mode === "signup"
          ? { name, email, password, phone, address }
          : { email, password };

      const schema = mode === "signup" ? SignUpSchema : SignInSchema;
      const result = schema.safeParse(validationData);

      if (!result.success) {
        const errors: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
          errors[issue.path[0] as string] = issue.message;
        });
        setFormErrors(errors);
        return { error: true, validation: true };
      }

      const res =
        mode === "signup"
          ? await registerUser(formData)
          : await loginUser(formData);

      if ("error" in res) {
        toast.error(res.message);
        return res;
      }

      if (mode === "signup") {
        setShowVerification(true);
        toast.info(res.message || "Verification code sent.");
      } else {
        const user = await getUser();
        if (user) {
          setProfile(user);
        }
        toast.success("Successfully signed in!");
        router.push(
          profile?.role !== "admin"
            ? "/dashboard/magazine"
            : "/dashboard/authors",
        );
      }
      return res;
    },
    null,
  );

  // Verification Action
  const [verifyState, verifyAction, isVerifyPending] = useActionState(
    async (previousState: unknown, formData: FormData) => {
      const code = otp.join("");
      const res = await verifyEmail(code);

      if ("error" in res) {
        toast.error(res.message);
        return res;
      }

      // Fetch user data and update context after verification
      const user = await getUser();
      if (user) {
        setProfile(user);
      }

      toast.success("Account verified! Welcome to Nexus.");
      router.push("/");
      return res;
    },
    null,
  );

  const handleOtpChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300 selection:bg-primary/30">
      <Navbar />
      <main className="flex-1 flex flex-col lg:flex-row">
        <section className="relative flex flex-col justify-end p-8 lg:p-20 overflow-hidden border-b lg:border-b-0 lg:border-r border-border bg-muted/20 min-h-[40vh] lg:h-[calc(100vh-4.1rem)] lg:w-1/2">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80"
              alt="Library"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-transparent" />
          </div>
          <div className="relative z-20 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[0.85] tracking-tighter uppercase text-white">
                ONE ACCOUNT.
                <br />
                <span className="text-primary">ALL OF NEXUS.</span>
              </h1>
              <p className="text-muted-foreground text-sm font-medium max-w-sm leading-relaxed">
                Seamlessly access the Magazine, explore the Bookstore, and
                manage your Events with a single secure ID.
              </p>
            </div>
          </div>
        </section>

        <section className="flex-1 flex flex-col items-center justify-center bg-card/10 px-6 py-12 lg:px-12 lg:w-1/2">
          <div
            className={`w-full ${mode === "signup" ? "max-w-md" : "max-w-sm"} transition-all duration-300 space-y-8`}
          >
            {!showVerification ? (
              <>
                <div className="flex border-b border-border gap-8">
                  {(["signin", "signup"] as const).map((t) => (
                    <button
                      key={t}
                      disabled={isAuthPending}
                      onClick={() => {
                        setMode(t);
                        setFormErrors({});
                      }}
                      className={`pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-2 ${mode === t ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                    >
                      {t === "signin" ? "Sign In" : "Create Account"}
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-black tracking-tighter uppercase">
                    {mode === "signin" ? "Welcome Back" : "Initialize Identity"}
                  </h2>
                </div>

                <form className="space-y-4" action={authAction} noValidate>
                  {mode === "signup" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                          Email Address
                        </label>
                        <input
                          name="email"
                          type="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-background border border-border rounded-xl px-5 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none text-sm font-medium shadow-sm"
                        />
                        {formErrors.email && (
                          <p className="text-[9px] text-red-500 font-bold uppercase ml-1">
                            {formErrors.email}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                          Full Name
                        </label>
                        <input
                          name="name"
                          type="text"
                          placeholder="Sarah Connor"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-background border border-border rounded-xl px-5 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none text-sm font-medium shadow-sm"
                        />
                        {formErrors.name && (
                          <p className="text-[9px] text-red-500 font-bold uppercase ml-1">
                            {formErrors.name}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                          Security Phrase
                        </label>
                        <div className="relative">
                          <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-background border border-border rounded-xl px-5 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none text-sm font-medium shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? (
                              <HiOutlineEyeSlash size={20} />
                            ) : (
                              <HiOutlineEye size={20} />
                            )}
                          </button>
                        </div>
                        {formErrors.password && (
                          <p className="text-[9px] text-red-500 font-bold uppercase ml-1">
                            {formErrors.password}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                          Phone
                        </label>
                        <input
                          name="phone"
                          type="text"
                          placeholder="+1234567890"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-background border border-border rounded-xl px-5 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none text-sm font-medium shadow-sm"
                        />
                        {formErrors.phone && (
                          <p className="text-[9px] text-red-500 font-bold uppercase ml-1">
                            {formErrors.phone}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                          Address
                        </label>
                        <input
                          name="address"
                          type="text"
                          placeholder="Nexus St"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full bg-background border border-border rounded-xl px-5 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none text-sm font-medium shadow-sm"
                        />
                        {formErrors.address && (
                          <p className="text-[9px] text-red-500 font-bold uppercase ml-1">
                            {formErrors.address}
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                          Email Address
                        </label>
                        <input
                          name="email"
                          type="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-background border border-border rounded-xl px-5 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none text-sm font-medium shadow-sm"
                        />
                        {formErrors.email && (
                          <p className="text-[9px] text-red-500 font-bold uppercase ml-1">
                            {formErrors.email}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                          Security Phrase
                        </label>
                        <div className="relative">
                          <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-background border border-border rounded-xl px-5 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none text-sm font-medium shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? (
                              <HiOutlineEyeSlash size={20} />
                            ) : (
                              <HiOutlineEye size={20} />
                            )}
                          </button>
                        </div>
                        {formErrors.password && (
                          <p className="text-[9px] text-red-500 font-bold uppercase ml-1">
                            {formErrors.password}
                          </p>
                        )}
                        <div className="flex justify-end pt-1">
                          <Link
                            href="#"
                            className="text-primary text-[10px] font-black uppercase hover:underline tracking-tighter"
                          >
                            Forgot Access?
                          </Link>
                        </div>
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                    disabled={isAuthPending}
                    className="w-full bg-primary text-white hover:opacity-90 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-primary/20 mt-2 disabled:opacity-50 disabled:cursor-wait"
                  >
                    {isAuthPending
                      ? "Authenticating..."
                      : mode === "signin"
                        ? "Authenticate"
                        : "Create Account"}
                  </button>
                </form>
              </>
            ) : (
              <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2">
                    <HiOutlineEnvelope size={28} />
                  </div>
                  <h2 className="text-3xl font-black tracking-tighter uppercase">
                    Verify email
                  </h2>
                  <p className="text-muted-foreground text-sm font-medium">
                    Sent 6-digit code to{" "}
                    <span className="text-foreground font-bold">{email}</span>.
                  </p>
                </div>
                <form className="flex flex-col gap-8" action={verifyAction}>
                  <div className="flex justify-between gap-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => {
                          inputRefs.current[index] = el;
                        }}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="w-full h-14 text-center text-xl font-bold rounded-xl border border-muted-foreground bg-background focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none"
                      />
                    ))}
                  </div>
                  <button
                    type="submit"
                    disabled={isVerifyPending}
                    className="w-full bg-primary text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl disabled:opacity-50"
                  >
                    {isVerifyPending ? "Verifying..." : "Verify Account"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowVerification(false)}
                    className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground self-center"
                  >
                    ← Back to registration
                  </button>
                </form>
              </div>
            )}
            <footer className="text-center">
              <p className="text-muted-foreground text-[10px] font-bold leading-relaxed uppercase tracking-tighter">
                By accessing Nexus, you agree to our{" "}
                <Link href="#" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-primary hover:underline">
                  Privacy Protocol
                </Link>
                .
              </p>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
