"use client";
import { useCartContext } from "@/app/[locale]/context";
import StoreNavbar from "@/app/[locale]/components/nav/storeNavbar";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Footer from "../components/footer/footer";
import CartModal from "../components/model/cartModal";

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
