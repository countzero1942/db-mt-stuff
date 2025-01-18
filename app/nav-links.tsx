"use client";

import { usePathname } from "next/navigation";
import path from "path";
import Link from "next/link";
import { useEffect, useState } from "react";

type NavLink = {
	label: string;
	href: string;
};

type NavLinksInfo = {
	dir: string;
	links: NavLink[];
};

const navLinksDict: Record<string, NavLink[]> = {
	"/": [
		{ label: "Home", href: "/" },
		{ label: "W3Schools MySQL", href: "/w3schools-mysql" },
		{ label: "Styling", href: "/styling" },
		{ label: "About", href: "/about" },
	],
	"/w3schools-mysql": [
		{ label: "Home", href: "/w3schools-mysql" },
		{
			label: "Select Basics",
			href: "/w3schools-mysql/select-basics",
		},
		{ label: "More Select", href: "more-select" },
	],
	"/styling": [
		{ label: "Home", href: "/styling" },
		{ label: "Headings and Text", href: "headings-and-text" },
		{ label: "Some Other Stuff", href: "some-other-stuff" },
	],
};

const getCurrentNavLinks = (pathName: string): NavLinksInfo => {
	// lands on home page of folder
	const homePageLinks = navLinksDict[pathName];
	if (homePageLinks !== undefined) {
		return {
			dir: pathName,
			links: homePageLinks,
		};
	}
	// lands on a child page of folder
	const pathInfo = path.parse(pathName);
	const parentLinks = navLinksDict[pathInfo.dir];
	if (parentLinks !== undefined) {
		return {
			dir: pathInfo.dir,
			links: parentLinks,
		};
	}
	// default to root links
	return {
		dir: "/",
		links: navLinksDict["/"],
	};
};

export default function NavLinks() {
	const pathName = usePathname();
	// const navLinks = getCurrentNavLinks(pathName);

	const [navLinksInfo, setNavLinksInfo] = useState<NavLinksInfo>(
		getCurrentNavLinks("/")
	);

	useEffect(() => {
		setNavLinksInfo(getCurrentNavLinks(pathName));
		console.log("useEffect called with pathName: ", pathName);
		console.log("navLinks: ", navLinksInfo);
	}, [pathName]); // Only re-run this effect if the pathName changes)

	const dir = navLinksInfo.dir;
	const constructHref = (href: string) => {
		return href.startsWith("/") ? href : `/${dir}/${href}`;
	};

	return (
		<>
			{navLinksInfo.links.map(({ label, href }) => (
				<Link href={constructHref(href)} key={label}>
					{label}
				</Link>
			))}
		</>
	);
}
