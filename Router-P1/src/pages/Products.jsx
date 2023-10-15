import { Link } from "react-router-dom";

const PRODUCTS = [
  { id: "p1", title: "Product 1" },
  { id: "p2", title: "Product 2" },
  { id: "p3", title: "Product 3" },
  { id: "p4", title: "Product 4" },
  { id: "p5", title: "Product 5" },
  { id: "p6", title: "Product 6" },
  { id: "p7", title: "Product 7" },
];
const ProductsPage = () => {
  return (
    <>
      <h1>The Products Page</h1>
      <ul>
        {PRODUCTS.map((product) => (
          <li key={product.id}>
            {/* //absolute
            <Link
              style={{ color: "var(--color-gray-100)" }}
              to={`/products/${product.id}`}
            > */}
            {/* //relative */}
            <Link style={{ color: "var(--color-gray-100)" }} to={product.id}>
              {product.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductsPage;
