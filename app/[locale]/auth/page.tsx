"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import Navbar from "../components/nav/navbar";
import { useAppContext, User } from "../context";
import { useRouter } from "next/navigation";

type AuthMode = "signin" | "signup";

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setProfile } = useAppContext();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let user: User;
    if (mode === "signup") {
      if (!name || !email || !password) {
        alert("Please fill all fields for sign up.");
        return;
      }
      user = { name, email };
    } else {
      if (!email || !password) {
        alert("Please fill all fields for sign in.");
        return;
      }
      // For signin, we might not have the full user object from the form.
      // I will create a user with email and a placeholder name from the email.
      const nameFromEmail = email.split("@")[0];
      user = { name: nameFromEmail, email };
    }
    setProfile(user);
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300 selection:bg-primary/30">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row">
        {/* Left Visual Section */}
        <section className="relative flex flex-col justify-end p-8 lg:p-20 overflow-hidden border-b lg:border-b-0 lg:border-r border-border bg-muted/20 min-h-[40vh] lg:h-[calc(100vh-4.1rem)] lg:w-1/2">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80"
              alt="Library"
              fill
              priority
              className="object-cover  group-hover:scale-105 transition-transform duration-700"
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

            <div className="flex flex-wrap gap-4 items-center pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full  bg-black overflow-hidden relative shadow-xl"
                  >
                    <Image
                      src={`https://i.pravatar.cc/150?u=${i + 20}`}
                      alt="Community Member"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary flex items-center justify-center text-[10px] font-black text-white shadow-xl">
                  +2K
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-white font-black uppercase tracking-widest">
                  Join the community
                </span>
                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight">
                  Authors, Readers & Organizers
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Right Form Section */}
        <section className="flex-1 flex flex-col items-center justify-center bg-card/10 px-6 py-12 lg:px-12 lg:w-1/2">
          <div className="w-full max-w-sm space-y-8">
            {/* Tabs */}
            <div className="flex border-b border-border gap-8">
              {(["signin", "signup"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setMode(t)}
                  className={`pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-2 ${
                    mode === t
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t === "signin" ? "Sign In" : "Create Account"}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black tracking-tighter uppercase">
                {mode === "signin" ? "Welcome Back" : "Initialize Identity"}
              </h2>
              <p className="text-muted-foreground text-xs font-medium">
                {mode === "signin"
                  ? "Access your unified Nexus dashboard."
                  : "Create your credentials for the ecosystem."}
              </p>
            </div>

            <form className="space-y-2" onSubmit={handleSubmit}>
              {mode === "signup" && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Sarah Connor"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl px-5 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none text-sm font-medium shadow-sm"
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-5 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none text-sm font-medium shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    Security Phrase
                  </label>
                  {mode === "signin" && (
                    <Link
                      href="#"
                      className="text-primary text-[10px] font-black uppercase hover:underline tracking-tighter"
                    >
                      Forgot Access?
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl px-5 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none text-sm font-medium shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <HiOutlineEyeSlash size={20} />
                    ) : (
                      <HiOutlineEye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white hover:opacity-90 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-primary/20 active:scale-[0.98] mt-2"
              >
                {mode === "signin" ? "Authenticate" : "Create Account"}
              </button>
            </form>

            <footer className="text-center">
              <p className="text-muted-foreground text-[10px] font-bold leading-relaxed uppercase tracking-tighter">
                By accessing Nexus, you agree to our{" "}
                <Link href="#" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                <br />
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
