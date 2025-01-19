"use client";

import { Customer, selectCustomers } from "@/server/mysql-a";
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

	const keys = Object.keys(customers[0]);

	const titles = keys.map(key => splitWords(key).join(" "));

	const head = (
		<TableTr>
			{titles.map(title => (
				<TableTh key={title}>{title}</TableTh>
			))}
		</TableTr>
	);

	const rows = customers.map(customer => (
		<TableTr key={customer.CustomerID}>
			{keys.map((key, index) => (
				<TableTd key={`${key}-${index}`}>{customer[key]}</TableTd>
			))}
		</TableTr>
	));

	return (
		<>
			<h3>Results</h3>
			<ScrollArea
				type="auto"
				h={300}
				offsetScrollbars="y"
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

export type SelectCustomersSectionProps = {
	sqlQuery: string;
	title: string;
};

export default function SelectCustomersSection({
	sqlQuery,
	title,
}: SelectCustomersSectionProps) {
	// const customers = await selectAllCustomers();

	let [customers, setCustomers] = useState<Customer[] | undefined>(
		undefined
	);

	const codeBlockProps: CodeBlockProps = {
		codeString: sqlQuery,
		language: "sql",
	};

	async function handleSelectAllCustomers() {
		const results = await selectCustomers(sqlQuery);
		setCustomers(results);
	}

	function handleClearAllCustomers() {
		setCustomers(undefined);
	}

	return (
		<>
			<h2>{title}</h2>
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
