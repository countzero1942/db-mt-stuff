import "@mantine/core/styles.css";
import React from "react";
import {
	MantineProvider,
	ColorSchemeScript,
	mantineHtmlProps,
} from "@mantine/core";
import { theme } from "../theme";
import "@/styles/global.css";
import TheApp from "./the-app";
import { logobj } from "@/utils/log";
import { log } from "console";
import { Inter, Poppins, Lato } from "next/font/google";
import clsx from "clsx";

export const metadata = {
	title: "Database Stuff",
	description: "Database Stuff using Mantine with Next.js!",
};

const interFont = Inter({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--iu-font-family-inter",
});

const poppinsFont = Poppins({
	subsets: ["latin"],
	weight: ["600", "700", "800", "900"],
	variable: "--iu-font-family-poppins",
});

const latoFont = Lato({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--iu-font-family-lato",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	log("theme");
	log(theme);
	return (
		<html
			lang="en"
			{...mantineHtmlProps}
			className={clsx(poppinsFont.className, latoFont.className)}
		>
			<head>
				<ColorSchemeScript />
				<link rel="shortcut icon" href="/favicon.svg" />
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
				/>
			</head>
			<body>
				<MantineProvider theme={theme}>
					<TheApp>{children}</TheApp>
				</MantineProvider>
			</body>
		</html>
	);
}
