import Grid from 'components/grid';
import { Product } from 'lib/shopify/types';
import ClassifiedProductCard from 'components/classified/product-card';

export default function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.handle} className="animate-fadeIn">
          <ClassifiedProductCard product={product} />
        </Grid.Item>
      ))}
    </>
  );
}
