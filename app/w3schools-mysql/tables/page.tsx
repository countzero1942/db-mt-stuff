import SelectQuerySection from "@/ui/select-query";
import { Divider } from "@mantine/core";

export default function TablesPage() {
	return (
		<article>
			<h1>Tables</h1>

			<p>
				In this section we will explore the basics of using MySql
				TABLE commands.
			</p>

			<SelectQuerySection
				title="Show Tables"
				sqlQuery="show tables"
				useTitleSplitting={false}
			/>

			<Divider my="2rem" />

			<SelectQuerySection
				title="Describe Categories Table"
				sqlQuery="describe categories"
				useTitleSplitting={false}
				useScrollArea={false}
			/>

			<Divider my="2rem" />

			<h2>Describe all Tables</h2>
		</article>
	);
}
