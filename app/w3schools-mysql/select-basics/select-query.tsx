"use client";

import {
	cleanMySqlQuery,
	cleanMySqlQueryArray,
} from "@/client-data/mysql";
import { Customer, selectCustomers } from "@/server/mysql-a";
import { CodeBlockProps, CodeBlock } from "@/ui/code-block";
import { cleanMultiLineArray } from "@/utils/string";
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
import { RowDataPacket } from "mysql2/promise";
import { Suspense, useState } from "react";

const getTable = (rows?: RowDataPacket[]) => {
	if (!rows) {
		return <></>;
	}
	if (rows.length === 0) {
		return (
			<>
				<Title order={3} my="md">
					Results
				</Title>
				<p>No customers found.</p>
			</>
		);
	}

	const keys = Object.keys(rows[0]);

	const titles = keys.map(key => splitWords(key).join(" "));

	const tableHeadRow = (
		<TableTr>
			{titles.map(title => (
				<TableTh key={title}>{title}</TableTh>
			))}
		</TableTr>
	);

	const tableRows = rows.map((row, index) => (
		<TableTr key={`row: ${index}`}>
			{keys.map((key, index) => (
				<TableTd key={`${key}-${index}`}>{row[key]}</TableTd>
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
					<TableThead>{tableHeadRow}</TableThead>
					<TableTbody>{tableRows}</TableTbody>
				</Table>
			</ScrollArea>
		</>
	);
};

export type SelectCustomersSectionProps = {
	sqlQuery: string;
	title: string;
	description?: string;
	addRowNumbers?: boolean;
};

export default function SelectQuerySection({
	sqlQuery,
	title,
	description,
	addRowNumbers,
}: SelectCustomersSectionProps) {
	const getCleanedQuery = () => {
		if (addRowNumbers) {
			let lines = sqlQuery.split("\n").map(line => line.trimEnd());
			lines = cleanMultiLineArray(lines, { extraIndents: 1 });
			lines = [
				"SELECT @i:=@i+1 AS 'Row', q.*",
				"FROM (",
				...lines,
				")",
				"AS q,",
				"(SELECT @i:=0) AS x",
			];
			lines = cleanMySqlQueryArray(lines);
			return lines.join("\n");
		}
		return cleanMySqlQuery(sqlQuery);
	};

	const cleanedSqlQuery = getCleanedQuery();

	let [customers, setCustomers] = useState<Customer[] | undefined>(
		undefined
	);

	const codeBlockProps: CodeBlockProps = {
		codeString: cleanedSqlQuery,
		language: "sql",
	};

	async function handleSelectAllCustomers() {
		const results = await selectCustomers(cleanedSqlQuery);
		setCustomers(results);
	}

	function handleClearAllCustomers() {
		setCustomers(undefined);
	}

	const Description = () => {
		if (description) {
			return <p>{description}</p>;
		}
		return null;
	};

	return (
		<>
			<h2>{title}</h2>
			<Description />
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
