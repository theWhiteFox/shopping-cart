import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, CartState, Product } from '../lib/definitions'
import toast from 'react-hot-toast'

const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            persist: true,
            items: [],
            addToCart: (product) => {
                let existingProduct: CartItem | undefined
                set((state) => {
                    existingProduct = state.items.find((item) => item.id === product.id)
                    return {
                        items: existingProduct
                            ? state.items
                            : [
                                ...get().items,
                                {
                                    quantity: 1,
                                    id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    image_url: product.image_url,
                                    inStock: product.inStock,
                                    amount: product.amount
                                },
                            ],
                    }
                })

                if (existingProduct) {
                    toast.error("Product Already exists")
                } else {
                    toast.success("Product Added successfully")
                }
            },
            remove: (product) => {
                const existingProduct = get().items.find((item) => item.id === product.id)
                if (existingProduct) {
                    set({
                        items: get().items.filter((item) => item.id !== product.id)
                    })
                    toast.success("Product removed successfully")
                } else {
                    toast.error("Product not found in cart")
                }
            },
            removeFromCart: (id: number) => {
                set({
                    items: get().items.filter((item) => item.id !== id),
                })
                toast.success("Item removed")
            },
            removeItemCart: (product: Product) => {
                set({
                    items: get().items.filter((item) => item.id !== product.id),
                })
                toast.success("Item removed")
            },
            updateQuantity: (type: 'increment' | 'decrement', id: number) => {
                const state = get()
                const item = state.items.find((item) => item.id === id)

                if (!item) return

                // 1. Handle removal
                if (type === 'decrement' && item.quantity === 1) {
                    state.removeFromCart(id)
                    return
                }

                // 2. Handle stock limit

                if (type === 'increment' && item.quantity >= (item.amount ?? 0)) {
                    toast.error("Max stock reached")
                    return
                }

                // 3. Update state immutably
                set({
                    items: state.items.map((i) =>
                        i.id === id ? { ...i, quantity: type === 'increment' ? i.quantity + 1 : i.quantity - 1 } : i
                    )
                })

            },
        }),
        {
            name: 'cart-storage', // Name of the item in storage (must be unique). 
            // Uses localStorage by default
        }
    )
)

export default useCartStore
