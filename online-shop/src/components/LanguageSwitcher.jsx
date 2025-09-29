import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select
      onChange={changeLanguage}
      value={i18n.language || "bn"} // default bn
      className="select w-18 text-[12px]"
    >
      <option value="bn">বাংলা</option>
      <option value="en">EN</option>
    </select>
  );
};

export default LanguageSwitcher;
