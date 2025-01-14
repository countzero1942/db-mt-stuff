import { selectAllCustomers } from "@/server/mysql-a";
import { CodeBlock, CodeBlockProps } from "@/ui/code-block";
import {
	Table,
	Title,
	TableTr,
	TableThead,
	TableTd,
	TableTbody,
	TableTh,
	TableScrollContainer,
	ScrollArea,
	Divider,
} from "@mantine/core";

export default async function HomePage() {
	const customers = await selectAllCustomers();
	const rows = customers.map(customer => (
		<TableTr key={customer.CustomerID}>
			<TableTd>{customer.CustomerID}</TableTd>
			<TableTd>{customer.CustomerName}</TableTd>
			<TableTd>{customer.ContactName}</TableTd>
			<TableTd>{customer.Address}</TableTd>
			<TableTd>{customer.City}</TableTd>
			<TableTd>{customer.PostalCode}</TableTd>
			<TableTd>{customer.Country}</TableTd>
		</TableTr>
	));

	const cb1: CodeBlockProps = {
		codeString: `select * from customers limit 10;`,
		language: "sql",
	};

	return (
		<article>
			<Title order={1} my="lg">
				Hello, Next.js!
			</Title>
			<Title order={2} my="md">
				Test MySQL
			</Title>
			<CodeBlock {...cb1} />
			<ScrollArea type="scroll" h={300}>
				<Table stickyHeader>
					<TableThead>
						<TableTr>
							<TableTh>CustomerID</TableTh>
							<TableTh>CustomerName</TableTh>
							<TableTh>ContactName</TableTh>
							<TableTh>Address</TableTh>
							<TableTh>City</TableTh>
							<TableTh>Postal Code</TableTh>
							<TableTh>Country</TableTh>
						</TableTr>
					</TableThead>
					<TableTbody>{rows}</TableTbody>
				</Table>
			</ScrollArea>
			<Divider variant="solid" my="lg" />
		</article>
	);
}
