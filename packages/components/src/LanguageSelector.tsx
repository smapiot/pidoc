import * as React from 'react';

export interface LanguageItem {
  flag: string;
  title: string;
  code: string;
  current: boolean;
  select(): void;
}

export interface LanguageSelectorProps {
  languages: Array<LanguageItem>;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ languages }) => {
  const [showLanguage, setShowLanguage] = React.useState(false);

  if (languages.length > 0) {
    const toggleLanguage = () => setShowLanguage((v) => !v);
    const setLanguage = (selectLanguage: () => void) => {
      selectLanguage;
      toggleLanguage();
    };

    return (
      <div className={showLanguage ? 'language-selector show' : 'language-selector'}>
        {languages.map((lang) => (
          <img
            src={lang.flag}
            title={lang.title}
            key={lang.code}
            className={lang.current ? 'current' : 'available'}
            onClick={() => (lang.current ? toggleLanguage() : setLanguage(lang.select))}
          />
        ))}
        <span className="seperator">|</span>
      </div>
    );
  }

  return null;
};
