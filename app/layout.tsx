import "@mantine/core/styles.css";
import React from "react";
import {
	MantineProvider,
	ColorSchemeScript,
	mantineHtmlProps,
} from "@mantine/core";
import { theme } from "../theme";
import "./global.css";
import TheApp from "./the-app";

export const metadata = {
	title: "Database Stuff",
	description: "Database Stuff using Mantine with Next.js!",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" {...mantineHtmlProps}>
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
