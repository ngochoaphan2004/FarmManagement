import { Inter } from "next/font/google";
import "../globals.css";
import { Roboto } from "next/font/google";
import { Toaster, toast } from 'sonner'
import {NextIntlClientProvider} from 'next-intl';
import {
  getMessages,
  getTranslations,
} from 'next-intl/server';
import { ReactNode } from "react";
import { SessionProvider } from "@/providers/SessionProvider";


const roboto = Roboto({
	weight: ["300", "400", "700"],
	style: ["normal", "italic"],
	subsets: ["latin"],
	display: "swap",
});
type Props = {
	children: ReactNode;
	params: {locale: string};
  };
export async function generateMetadata({
	params: {locale}
  }: Omit<Props, 'children'>) {
	const t = await getTranslations({locale, namespace: 'LocaleLayout'});
  
	return {
	  	title: "SmartFarm",
	 	description: t("description"),
	};
  }
  
export default async function RootLayout({
	children,
	params: {locale}
  }: Props) {
	const messages = await getMessages();
  
	return (
		<html className={roboto.className} lang={locale}>
			<body className="no-scrollbar hide-scrollbar">
				<NextIntlClientProvider messages={messages}>
				<SessionProvider>
					<Toaster closeButton  expand={false} richColors position="top-center" />
					{children}
					</SessionProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}