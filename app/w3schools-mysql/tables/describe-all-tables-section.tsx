import { doMultiSelectQuery, doSelectQuery } from "@/server/mysql-a";
import { CodeBlockProps, CodeBlock } from "@/ui/code-block";
import { ResultsTable } from "@/ui/select-query";
import { Group, Button, Title } from "@mantine/core";
import { RowDataPacket } from "mysql2";
import { title } from "process";
import { useState, Suspense } from "react";

export default function DescribeAllTablesSection() {
	const query = `

	`;

	const getCleanedQuery = () => {
		return "";
	};

	const cleanedSqlQuery = getCleanedQuery();

	let [tables, setTables] = useState<RowDataPacket[][] | undefined>(
		undefined
	);

	const codeBlockProps: CodeBlockProps = {
		codeString: cleanedSqlQuery,
		language: "sql",
	};

	const getDescribeTablesQuery = (
		tableList: RowDataPacket[]
	): string | undefined => {
		if (tableList.length === 0) return undefined;
		const keys = Object.keys(tableList[0]);
		if (keys.length === 0) return undefined;

		const queries = tableList.map(
			row => `DESCRIBE ${row[keys[0]]};`
		);

		return queries.join("\n");
	};

	async function handleDescribeAllTables() {
		const tableList = await doSelectQuery("show tables");
		const describeTablesQuery = getDescribeTablesQuery(tableList);
		if (describeTablesQuery === undefined) return;

		const results = await doMultiSelectQuery(describeTablesQuery);

		setTables(results);
	}

	function handleClearAllTables() {
		setTables(undefined);
	}

	return (
		<>
			<h2>{title}</h2>
			<CodeBlock {...codeBlockProps} />
			<Group my="md">
				<Button onClick={handleDescribeAllTables}>
					Do query
				</Button>
				<Button onClick={handleClearAllTables} disabled={!tables}>
					Clear Results
				</Button>
			</Group>
			<Suspense fallback={<Title>Loading...</Title>}></Suspense>
		</>
	);
}
