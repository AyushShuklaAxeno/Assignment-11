import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";

export default function ProductList({ products, onAddToCart, cartItems }) {
    return (
        <div className="product-list" id="products">
            {products.length === 0 ? (
                <EmptyState message="No products found" />
            ) : (
                products.map((product, index) => {
                    const isInCart = cartItems.some((item) => item.id === product.id);
                    return (
                        <ProductCard
                            key={index}
                            name={product.name}
                            price={product.price}
                            image={product.image}
                            category={product.category}
                            inCart={isInCart}
                            onAddToCart={() => onAddToCart(product)}
                        />
                    );
                })
            )}
        </div>
    );
}