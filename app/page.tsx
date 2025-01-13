import { selectAllCustomers } from "@/server/mysql-a";

export default async function HomePage() {
	const customers = await selectAllCustomers();
	return (
		<article>
			<h1>Hello, Next.js!</h1>
			<p>Welcome to your new Next.js application.</p>
			<p>
				<a href="https://mantine.dev/">Mantine</a> is a modern and
				flexible UI toolkit for React.
			</p>
		</article>
	);
}
