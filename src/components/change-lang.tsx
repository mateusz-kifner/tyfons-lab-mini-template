import { useLanguageContext } from "@/context/i18nextContext";
import { Button } from "./ui/button";

export function ChangeLang() {
	const { setLanguage, language } = useLanguageContext();

	return (
		<div>
			<Button onClick={() => setLanguage(language === "en" ? "pl" : "en")}>
				Language: {language}
			</Button>
		</div>
	);
}
