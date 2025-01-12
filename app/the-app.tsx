"use client";

import { NumSeq } from "@/utils/seq";
import { AppShell, Burger, Group, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function TheApp({ children }: { children: any }) {
	const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
	const [desktopOpened, { toggle: toggleDesktop }] =
		useDisclosure(true);

	return (
		// AppShell component provides a consistent layout for your app shell
		// It includes header, navbar, and main sections
		// You can customize it according to your needs
		// The AppShell.Header, AppShell.Navbar, and AppShell.Main
		// components are provided by Mantine library
		<AppShell
			header={{ height: 60 }}
			navbar={{
				width: 300,
				breakpoint: "sm",
				collapsed: {
					mobile: !mobileOpened,
					desktop: !desktopOpened,
				},
			}}
			padding="md"
		>
			<AppShell.Header>
				<Group h="100%" px="md">
					<Burger
						opened={mobileOpened}
						onClick={toggleMobile}
						hiddenFrom="sm"
						size="sm"
					/>
					<Burger
						opened={desktopOpened}
						onClick={toggleDesktop}
						visibleFrom="sm"
						size="sm"
					/>
				</Group>
			</AppShell.Header>
			<AppShell.Navbar p="md">
				Navbar
				{NumSeq.count(15).imap(index => (
					<Skeleton key={index} h={28} mt="sm" animate={false} />
				))}
			</AppShell.Navbar>
			<AppShell.Main>{children}</AppShell.Main>
		</AppShell>
	);
}
