import ProductCard from './ProductCard';

const ProductsContainer = ({products}) => {

    return (
    <main className='flex min-h-screen flex-col gap-16 items-center justify-between mt-32 lg:mt-48 md:grid md: grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  md:mx-auto md:justify-items-center md:items-start max-w-[1200px] '>
      {products ? (
        products.map((product) => {
          return (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              collection={product.collection}
              length={product.length}
              width={product.width}
              height={product.height}
              weight={product.weight}
              isDestacado={product.isDestacado}
              isActive={product.isActive}
              images={product.images}
              price={product.price}
            />
          );
        })
      ) : (
        <p>No products available</p>
      )}
    </main>

)}

export default ProductsContainer;
