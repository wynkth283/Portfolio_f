import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LanguageContext = createContext({
    language: "en",
    setLanguage: () => {},
    t: {},
});

const translations = {
    en: {
        heroGreeting: "Hello, I'm",
        heroCta: "Get in Touch",
        aboutTitle: "About Me",
        skillsTitle: "Skills",
        languageCategory: "Language",
        languageOptions: {
            vi: "Vietnamese",
            en: "English",
        },
        educationTitle: "Education",
        educationMajorLabel: "Major",
        projectsTitle: "Projects",
        projectsEmpty: "No projects found",
        contactTitle: "Contact",
        contactEmailLabel: "Email",
        contactPhoneLabel: "Phone",
        contactAddressLabel: "Address",
        contactCta: "Can contact me directly via Facebook, Instagram or contact via gmail.",
        projectRoleLabel: "Role",
        projectDescriptionLabel: "Description",
        skillsLanguageHelper: "Change display language",
    },
    vi: {
        heroGreeting: "Xin chào, tôi là",
        heroCta: "Liên hệ ngay",
        aboutTitle: "Giới thiệu",
        skillsTitle: "Kỹ năng",
        languageCategory: "Ngôn ngữ",
        languageOptions: {
            vi: "Tiếng Việt",
            en: "Tiếng Anh",
        },
        educationTitle: "Học vấn",
        educationMajorLabel: "Chuyên ngành",
        projectsTitle: "Dự án",
        projectsEmpty: "Không có dự án nào",
        contactTitle: "Liên hệ",
        contactEmailLabel: "Email",
        contactPhoneLabel: "Điện thoại",
        contactAddressLabel: "Địa chỉ",
        contactCta: "Có thể liên hệ trực tiếp với tôi qua Facebook, Instagram hoặc liên hệ qua gmail.",
        projectRoleLabel: "Vai trò",
        projectDescriptionLabel: "Mô tả",
        skillsLanguageHelper: "Chọn ngôn ngữ hiển thị",
    },
};

const getInitialLanguage = () => {
    if (typeof window === "undefined") {
        return "en";
    }
    return localStorage.getItem("preferredLanguage") || "en";
};

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(getInitialLanguage);

    const changeLanguage = (nextLanguage) => {
        if (!translations[nextLanguage]) {
            return;
        }
        setLanguage(nextLanguage);
    };

    useEffect(() => {
        if (typeof document !== "undefined") {
            document.documentElement.lang = language;
        }
        if (typeof window !== "undefined") {
            localStorage.setItem("preferredLanguage", language);
        }
    }, [language]);

    const value = useMemo(
        () => ({
            language,
            setLanguage: changeLanguage,
            t: translations[language] || translations.en,
        }),
        [language]
    );

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}


