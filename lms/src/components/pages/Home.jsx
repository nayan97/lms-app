import React from "react";
import Layout from "../Shared/Layout";
import Hero from "../Hero";
import FeaturedCategories from "../FeaturedCategories";
import FeaturedCourses from "../FeaturedCourses";

const Home = () => {
  return (
    <Layout>
      <Hero></Hero>
      <FeaturedCategories></FeaturedCategories>
      <FeaturedCourses></FeaturedCourses>
    </Layout>
  );
};

export default Home;
