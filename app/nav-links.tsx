"use client";

import { usePathname } from "next/navigation";
import path from "path";
import Link from "next/link";

import { useEffect, useState } from "react";
import { Divider, NavLink } from "@mantine/core";
import { FaChevronRight } from "react-icons/fa";

type NavLink = {
	label: string;
	href: string;
	children?: boolean;
};

type NavLinksInfo = {
	dir: string;
	links: NavLink[];
};

const navLinksDict: Record<string, NavLink[]> = {
	"/": [
		{ label: "Home", href: "/" },
		{
			label: "W3Schools MySQL",
			href: "/w3schools-mysql",
			children: true,
		},
		{ label: "Styling", href: "/styling", children: true },
		{ label: "About", href: "/about" },
	],
	"/w3schools-mysql": [
		{ label: "W3 MySQL Home", href: "/w3schools-mysql" },
		{
			label: "SELECT Basics",
			href: "/w3schools-mysql/select-basics",
		},
		{
			label: "More SELECT",
			href: "/w3schools-mysql/more-select",
		},
	],
	"/styling": [
		{ label: "Styling Home", href: "/styling" },
		{
			label: "Headings and Text",
			href: "/styling/headings-and-text",
		},
		{
			label: "Some Other Stuff",
			href: "/styling/some-other-stuff",
		},
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
		const newNavLinksInfo = getCurrentNavLinks(pathName);
		setNavLinksInfo(newNavLinksInfo);
		console.log("useEffect called with pathName: ", pathName);
		console.log("navLinks: ", newNavLinksInfo);
	}, [pathName]); // Only re-run this effect if the pathName changes)

	const HomeBreadCrumb = () => {
		if (navLinksInfo.dir !== "/") {
			return (
				<>
					<NavLink
						key="Home"
						label="Home"
						component={Link}
						href="/"
					/>
					<Divider my="0.5rem" />
				</>
			);
		}
		return null;
	};

	const getChildrenIcon = (children?: boolean) => {
		if (children === true) {
			return (
				<FaChevronRight
					size="0.5rem"
					style={{
						verticalAlign: "bottom",
					}}
				/>
			);
		}
		return null;
	};

	return (
		<>
			<HomeBreadCrumb />
			{navLinksInfo.links.map(({ label, href, children }) => {
				return (
					<NavLink
						key={label}
						label={label}
						component={Link}
						href={href}
						active={pathName === href}
						rightSection={getChildrenIcon(children)}
					/>
				);
			})}
		</>
	);
}
