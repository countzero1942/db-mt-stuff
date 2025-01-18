"use client";

import { Customer, selectAllCustomers } from "@/server/mysql-a";
import { CodeBlockProps, CodeBlock } from "@/ui/code-block";
import {
	TableTr,
	TableTd,
	Title,
	ScrollArea,
	Table,
	TableThead,
	TableTh,
	TableTbody,
	Divider,
	Button,
	Group,
} from "@mantine/core";
import { get } from "http";
import { set, splitWords } from "moderndash";
import { Suspense, useState } from "react";

const getTable = (customers?: Customer[]) => {
	if (!customers) {
		return <></>;
	}
	if (customers.length === 0) {
		return (
			<>
				<Title order={3} my="md">
					Results
				</Title>
				<p>No customers found.</p>
			</>
		);
	}

	const titles = Object.keys(customers[0]).map(key =>
		splitWords(key).join(" ")
	);

	const head = (
		<TableTr>
			{titles.map(title => (
				<TableTh key={title}>{title}</TableTh>
			))}
		</TableTr>
	);

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

	return (
		<>
			<Title order={3} my="md">
				Results
			</Title>
			<ScrollArea
				type="auto"
				h={300}
				offsetScrollbars="x"
				bd="1px solid var(--mantine-color-default-border)"
				my="md"
			>
				<Table stickyHeader striped withColumnBorders>
					<TableThead>{head}</TableThead>
					<TableTbody>{rows}</TableTbody>
				</Table>
			</ScrollArea>
		</>
	);
};

export default function SelectAllCustomersSection() {
	// const customers = await selectAllCustomers();

	let [customers, setCustomers] = useState<Customer[] | undefined>(
		undefined
	);

	const codeBlockProps: CodeBlockProps = {
		codeString: `select * from customers;`,
		language: "sql",
	};

	async function handleSelectAllCustomers() {
		const results = await selectAllCustomers();
		// setCustomers(results);
		setCustomers([]);
	}

	function handleClearAllCustomers() {
		setCustomers(undefined);
	}

	return (
		<>
			<Title order={2} my="md">
				Select All Customers
			</Title>
			<CodeBlock {...codeBlockProps} />
			<Group my="md">
				<Button onClick={handleSelectAllCustomers}>
					Fetch Customers
				</Button>
				<Button
					onClick={handleClearAllCustomers}
					disabled={!customers}
				>
					Clear Results
				</Button>
			</Group>
			<Suspense fallback={<Title>Loading...</Title>}>
				{getTable(customers)}
			</Suspense>
		</>
	);
}
