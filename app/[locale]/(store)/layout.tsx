"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import StoreNavbar from "@/components/nav/storeNavbar";
import Footer from "../components/footer/footer";
import { FiX, FiShoppingCart, FiArrowRight } from "react-icons/fi";
import { useCartContext, CartItem } from "@/app/[locale]/context";
import Image from "next/image";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const router = useRouter();
  const { cartItems, totalQuantity, totalPrice } = useCartContext();

  const toggleCartModal = () => {
    setIsCartModalOpen(!isCartModalOpen);
  };

  const navigateToCartPage = () => {
    toggleCartModal();
    router.push("/service/store/cart");
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-background text-foreground">
      <StoreNavbar onCartIconClick={toggleCartModal} />
      <main className="flex-1">{children}</main>
      <Footer />

      {/* Cart Modal */}
      {isCartModalOpen && (
        <CartModal
          toggleCartModal={toggleCartModal}
          totalQuantity={totalQuantity}
          cartItems={cartItems}
          totalPrice={totalPrice}
          navigateToCartPage={navigateToCartPage}
        />
      )}
    </div>
  );
}
function CartModal({
  toggleCartModal,
  totalQuantity,
  cartItems,
  totalPrice,
  navigateToCartPage,
}: {
  toggleCartModal: () => void;
  totalQuantity: number;
  cartItems: CartItem[];
  totalPrice: number;
  navigateToCartPage: () => void;
}): React.ReactNode {
  return (
    <div
      className="fixed inset-0 z-99 bg-black/50 backdrop-blur-sm flex justify-end animate-in fade-in"
      onClick={toggleCartModal}
    >
      <div
        className="relative w-full md:w-[400px] bg-background h-full shadow-lg flex flex-col animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-foreground/10">
          <h2 className="text-xl font-bold">Your Cart ({totalQuantity})</h2>
          <button
            onClick={toggleCartModal}
            className="p-2 hover:bg-foreground/5 rounded-full"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 p-4 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-foreground/60">
              <FiShoppingCart size={48} className="mb-4" />
              <p className="text-lg font-medium">Your cart is empty</p>
              <p className="text-sm">Add some books to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-foreground/5 p-3 rounded-lg"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={50}
                    height={75}
                    className="rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-sm">{item.title}</h3>
                    <p className="text-xs text-foreground/60">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <span className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-foreground/10">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold">Total:</span>
            <span className="text-xl font-black">${totalPrice.toFixed(2)}</span>
          </div>
          <button
            onClick={navigateToCartPage}
            className="w-full bg-primary text-primary-foreground font-black py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            View Cart <FiArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
