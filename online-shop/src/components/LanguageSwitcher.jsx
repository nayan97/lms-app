import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "bn" ? "en" : "bn";
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className=" bg-white  text-lg font-medium hover:bg-yellow-100 transition"
    >
      {i18n.language === "bn" ? "English" : "বাংলা"}
    </button>
  );
};

export default LanguageSwitcher;
