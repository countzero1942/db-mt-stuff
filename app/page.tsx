import SelectAllCustomersSection from "@/app/select-all-customers";
import { Divider, Title } from "@mantine/core";

export default async function HomePage() {
	return (
		<article>
			<Title order={1} my="lg">
				Hello, Next.js!
			</Title>

			<p>Some text</p>

			<Divider variant="solid" my="lg" />

			<h1>Heading 1</h1>
			<h2>Heading 2</h2>
			<h3>Heading 3</h3>
			<h4>Heading 4</h4>
			<h5>Heading 5</h5>
			<h6>Heading 6</h6>
		</article>
	);
}
