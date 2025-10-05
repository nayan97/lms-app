import { useTranslation } from "react-i18next";
import LatestProducts from "../../components/LatestProducts";
import PopularProducts from "../../components/PopularProducts";
import Footer_Nav from "../Shared/Footer_Nav";
import Header from "../Shared/Header";
import Header_shop from "../Shared/Header_shop";


const Shop = () => {
  const { t } = useTranslation();

  return (
    <div className="space-t-2">
      {/* Header */}
      <Header_shop showitem={true}></Header_shop>
      {/* Popular Products */}
      <PopularProducts></PopularProducts>

      

      {/* Latest Products */}
      <LatestProducts></LatestProducts>
      {/* Button */}
     
      

      {/* Footer */}
      <Footer_Nav></Footer_Nav>
    </div>
  );
};

export default Shop;
