
import LatestProducts from "../../components/LatestProducts";
import PopularProducts from "../../components/PopularProducts";

const Home = () => {


  return (
    <div className="mx-auto max-w-7xl">
      {/* Popular Products */}
         <PopularProducts></PopularProducts>

      {/* Latest Products */}
      <LatestProducts></LatestProducts>
    </div>
  );
};

export default Home;
