import path from "path";

export type NavLink = {
	label: string;
	href: string;
	children?: boolean;
};

export type NavLinksInfo = {
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

export const getCurrentNavLinks = (
	pathName: string
): NavLinksInfo => {
	console.log("getCurrentNavLinks called with pathName: ", pathName);
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
	// defaults to root links
	return {
		dir: "/",
		links: navLinksDict["/"],
	};
};
