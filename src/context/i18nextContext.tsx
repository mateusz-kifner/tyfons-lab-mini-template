import { createContext, useContext, useEffect, type ReactNode } from "react";

import { useLocalStorage } from "@mantine/hooks";

import "../i18n";
import i18n from "i18next";

interface LanguageContextType {
	language?: string;
	setLanguage: (language: string) => void;
}

export const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [language, setLanguage] = useLocalStorage<string>({
		key: "language",
		defaultValue: "pl",
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (language === undefined) {
			setLanguage("pl");
			return;
		}
		if (i18n.language === language) return;
		i18n.changeLanguage(language);
	}, []);

	return (
		<LanguageContext.Provider
			value={{
				language,
				setLanguage: (language) => {
					setLanguage(language);
					i18n.changeLanguage(language);
				},
			}}
		>
			{children}
		</LanguageContext.Provider>
	);
};

export function useLanguageContext(): LanguageContextType {
	const state = useContext(LanguageContext);
	if (!state) {
		throw new Error(
			`ERROR: Language reached invalid state, null 'language' in context`,
		);
	}
	return state;
}
