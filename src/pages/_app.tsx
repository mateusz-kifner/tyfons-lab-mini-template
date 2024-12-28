import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider, ThemeToggle } from "@/components/ui/theme";
import { Toaster } from "@/components/ui/sonner";
import useColorScheme from "@/components/ui/useColorScheme";

import { LanguageContextProvider } from "@/context/i18nextContext";

import "../bug-report"

export default function MyApp({ Component, pageProps }: AppProps) {
	useColorScheme();

	return (
		<LanguageContextProvider>
			<div className="h-min-screen bg-popover text-foreground">
				<TooltipProvider>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
						<TRPCReactProvider>
							<Component {...pageProps} />
						</TRPCReactProvider>
						<div className="fixed right-4 bottom-4">
							<ThemeToggle />
						</div>
						<Toaster />
					</ThemeProvider>
				</TooltipProvider>
			</div>
		</LanguageContextProvider>
	);
}
