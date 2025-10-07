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
      className="px-4 py-2 bg-white text-yellow-600  text-sm font-medium hover:bg-yellow-100 transition"
    >
      {i18n.language === "bn" ? "English" : "বাংলা"}
    </button>
  );
};

export default LanguageSwitcher;
