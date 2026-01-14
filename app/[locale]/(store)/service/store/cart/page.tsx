"use client";

import React from "react";

const CartPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-4xl font-black mb-6">Your Shopping Cart</h1>
      <p className="text-lg">This is where the detailed cart information will be displayed.</p>
      {/* More detailed cart items, quantities, totals, checkout options will go here */}
    </div>
  );
};

export default CartPage;
