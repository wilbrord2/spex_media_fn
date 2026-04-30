"use client";

import { useRouter } from "next/navigation";
import { useCartContext } from "@/app/[locale]/context";
import {
  FiChevronLeft,
  FiTrash2,
  FiPlus,
  FiMinus,
  FiShoppingBag,
  FiLock,
} from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

const CartPage = () => {
  const router = useRouter();
  const { cartItems, updateQuantity, removeFromCart, totalPrice } =
    useCartContext();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="size-20 bg-foreground/5 rounded-full flex items-center justify-center mb-6">
          <FiShoppingBag size={32} className="opacity-20" />
        </div>
        <h1 className="text-2xl font-black italic">
          Your basket is <span className="text-primary">empty</span>
        </h1>
        <button
          onClick={() => router.push("/")}
          className="mt-6 px-8 py-3 bg-primary text-primary-foreground font-black rounded-xl"
        >
          Back to Store
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32 md:pb-12">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-primary transition-colors"
          >
            <FiChevronLeft size={20} />
            Back
          </button>
          <div className="text-center">
            <h1 className="text-lg font-black italic uppercase tracking-tighter">
              Review <span className="text-primary">Order</span>
            </h1>
          </div>
          <div className="w-10" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* 1. LEFT COLUMN: Item List */}
          <div className="lg:col-span-8 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col sm:flex-row gap-6 p-4 md:p-6 bg-foreground/2 rounded-3xl border border-white/5 hover:border-white/10 transition-colors"
              >
                {/* Book Cover */}
                <div className="w-32 aspect-3/4 bg-zinc-800 rounded-2xl overflow-hidden shadow-2xl self-center sm:self-start shrink-0">
                  <Image
                    className="w-full h-full object-cover"
                    src={item.image!}
                    alt={item.title!}
                    width={50}
                    height={75}
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xl font-black leading-tight pr-10">
                      {item.title}
                    </h3>
                    <p className="text-sm text-foreground/40 font-medium">
                      {item.author}
                    </p>

                    {/* Fractional Rating Display */}
                    <div className="flex items-center gap-2 pt-2">
                      <div className="flex text-amber-500 text-[10px] gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const fill =
                            Math.min(
                              Math.max(item.rating! - (star - 1), 0),
                              1,
                            ) * 100;
                          return (
                            <div key={star} className="relative">
                              <FaStar className="opacity-10" />
                              <div
                                className="absolute inset-0 overflow-hidden"
                                style={{ width: `${fill}%` }}
                              >
                                <FaStar />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <span className="text-[10px] font-black opacity-30 tabular-nums">
                        {item.rating?.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  {/* Controls Row */}
                  <div className="flex items-center justify-between sm:justify-start gap-4 mt-6">
                    <div className="flex items-center bg-background rounded-full p-1 border border-white/10">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id!,
                            Math.max(1, item.quantity - 1),
                          )
                        }
                        className="size-8 flex items-center justify-center hover:text-primary transition-colors"
                      >
                        <FiMinus size={14} />
                      </button>
                      <span className="px-4 text-sm font-black tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id!, item.quantity + 1)
                        }
                        className="size-8 flex items-center justify-center hover:text-primary transition-colors"
                      >
                        <FiPlus size={14} />
                      </button>
                    </div>

                    {/* Remove Icon - MOBILE ONLY */}
                    <button
                      onClick={() => removeFromCart(item.id!)}
                      className="sm:hidden text-red-500/40 hover:text-red-500 p-2 transition-colors"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Right Corner Area - DESKTOP ONLY */}
                <div className="hidden sm:flex flex-col items-end justify-between py-1">
                  <button
                    onClick={() => removeFromCart(item.id!)}
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/20 hover:text-red-500 transition-colors"
                  >
                    Remove
                  </button>

                  <p className="text-2xl font-black italic tracking-tighter">
                    ${(item.price! * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 2. RIGHT COLUMN: Summary (Desktop Sticky) */}
          <div className="lg:col-span-4 hidden md:block">
            <div className="sticky top-24 p-8 bg-foreground/3 border border-white/10 rounded-4xl space-y-6">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] opacity-30">
                Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="opacity-60">Subtotal</span>
                  <span className="font-bold">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-60">Shipping</span>
                  <span className="text-green-500 font-bold uppercase text-[10px] tracking-widest">
                    Digital Delivery (Free)
                  </span>
                </div>
                <div className="pt-4 border-t border-white/5 flex justify-between items-end">
                  <span className="font-black uppercase text-xs tracking-widest opacity-40">
                    Total
                  </span>
                  <span className="text-3xl font-black italic">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <button className="group w-full py-5 bg-primary text-primary-foreground font-black rounded-2xl shadow-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all">
                <FiLock size={18} />
                SECURE CHECKOUT
              </button>

              <p className="text-[10px] text-center opacity-30 font-medium leading-relaxed">
                By proceeding, you agree to our Terms of Service.
                <br />
                Digital manuscripts are delivered instantly.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* 3. MOBILE STICKY FOOTER */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
        <div className="bg-background/80 backdrop-blur-2xl border-t border-white/5 p-4 pb-8">
          <div className="flex items-center justify-between mb-4 px-2">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-30">
                To Pay
              </p>
              <p className="text-2xl font-black italic">
                ${totalPrice.toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black opacity-30 uppercase">
                {cartItems.length} Items
              </p>
            </div>
          </div>
          <button className="w-full py-4 bg-primary text-primary-foreground font-black rounded-2xl shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-transform">
            <FiLock size={18} />
            CHECKOUT NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
