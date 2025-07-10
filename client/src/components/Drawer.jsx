import React from "react";

export default function Drawer({
  isOpen,
  onClose,
  children,
  side = "right",
  width = "w-80 md:w-96",
  navbarHeight = "top-16",
}) {
  return (
    <>
      <div className={`fixed left-0 right-0 bottom-0 ${navbarHeight} z-50 pointer-events-none`}>
        
        {/* Overlay */}
        {isOpen && (
          <div
            className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm pointer-events-auto"
            onClick={onClose}
          />
        )}

        {/* Drawer */}
        <div
          className={`
            absolute ${side === "right" ? "right-0" : "left-0"}
            h-full bg-base-200  ${width} p-4
            transform transition-transform duration-300 ease-in-out
            ${isOpen
              ? "translate-x-0"
              : side === "right"
              ? "translate-x-full"
              : "-translate-x-full"}
            shadow-lg
            pointer-events-auto
          `}
        >
          {children}
        </div>
      </div>
    </>
  );
}
