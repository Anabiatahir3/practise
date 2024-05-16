import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    title: "book 1",
    price: 5,
    description: "nice book",
  },
  {
    id: "p2",
    title: "book 2",
    price: 10,
    description: "best book",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>

      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            price={product.price}
            description={product.description}
            title={product.title}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
