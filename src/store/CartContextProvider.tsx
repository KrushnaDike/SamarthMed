import React, { createContext, FC, ReactNode, useState } from 'react'

export enum ProductStatus {
    IN_STOCK = "In Stock",
    OUT_OF_STOCK = "Out of Stock"
}

export type DeliveryType = "express" | "standard" | "pickup";

export type Product = {
    id: number,
    name: string,
    price: number
    status: ProductStatus,
    delivery: DeliveryType
}

interface CartContextType {
    initialProducts: Product[],
    cart: Product[],
    addToCart: (product: Product) => void,
    removeFromCart: (product: Product) => void
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

type props = {
    children: ReactNode
}

export const CartContextProvider: FC<props> = ({ children }) => {

    const [cart, setCart] = useState<Product[]>([]);

    console.log("Cart: ", cart);

    const initialProducts: Product[] = [
        {
            id: 1,
            name: "Oil",
            price: 200,
            status: ProductStatus.IN_STOCK,
            delivery: "express",
        },
        {
            id: 2,
            name: "Soap",
            price: 50,
            status: ProductStatus.OUT_OF_STOCK,
            delivery: "standard",
        },
        {
            id: 3,
            name: "Honey",
            price: 150,
            status: ProductStatus.IN_STOCK,
            delivery: "pickup",
        },
    ];

    const addToCart = (product: Product) => {
        setCart([...cart, product]);
    }

    const removeFromCart = (product: Product) => {
        setCart(cart.filter((item) => item.id !== product.id))
    }

    const value: CartContextType = {
        initialProducts,
        cart,
        addToCart,
        removeFromCart
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
