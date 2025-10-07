import { useTranslation } from "react-i18next";
import LatestProducts from "../../components/LatestProducts";
import PopularProducts from "../../components/PopularProducts";
import Footer_Nav from "../Shared/Footer_Nav";
import Header from "../Shared/Header";
import Header_shop from "../Shared/Header_shop";
import SearchBar from "../../components/SearchBar";
import AdBanner from "../../components/AdBanner";
import Advertisement from "../../components/Advertisement";
import FeaturedCategories from "../../components/FeaturedCategories";
import QuickAction from "../../components/QuickAction";


const Shop = () => {
  const { t } = useTranslation();

  return (
    <div className="space-t-2">
      {/* Header */}
      <Header_shop showitem={true}></Header_shop>

      <div className="bg-gray-100 pt-5 max-w-7xl mx-auto rounded-t-[50px]">
        {/* Search bar */}
     <SearchBar></SearchBar>
      
      {/*Adds Banner */}
      <Advertisement></Advertisement>
      
      {/*Quick Action pages */}
      <QuickAction></QuickAction>


      {/* Category */}
      <FeaturedCategories></FeaturedCategories>
      </div>
      

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
