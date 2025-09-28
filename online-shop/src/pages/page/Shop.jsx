import LatestProducts from "../../components/LatestProducts";
import PopularProducts from "../../components/PopularProducts";

const Shop = () => {
  return (
    <div className="space-t-6">
      {/* Popular Products */}
      <PopularProducts></PopularProducts>

      {/* Latest Products */}
      <LatestProducts></LatestProducts>
    </div>
  );
};

export default Shop;
