import SelectAllCustomersSection from "@/app/select-all-customers";
import { Divider, Title } from "@mantine/core";

export default async function HomePage() {
	return (
		<article>
			<Title order={1} my="lg">
				Hello, Next.js!
			</Title>

			<Title order={1}>Heading 1</Title>
			<Title order={2}>Heading 2</Title>
			<Title order={3}>Heading 3</Title>
			<Title order={4}>Heading 4</Title>
			<Title order={5}>Heading 5</Title>
			<Title order={6}>Heading 6</Title>

			<Divider variant="solid" my="lg" />
		</article>
	);
}
