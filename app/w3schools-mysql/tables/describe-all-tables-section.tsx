"use client";
import { doMultiMySqlQuery, doMySqlQuery } from "@/server/mysql-a";
import { CodeBlockProps, CodeBlock } from "@/ui/code-block";
import { QueryResultsTable } from "@/ui/select-query";
import { Group, Button, Title } from "@mantine/core";
import { log } from "console";
import { set } from "moderndash";
import { RowDataPacket } from "mysql2";
import { title } from "process";
import { useState, Suspense } from "react";
import { capitalize } from "moderndash";

export default function DescribeAllTablesSection() {
	let [tables, setTables] = useState<RowDataPacket[][]>([]);
	let [tableNames, setTableNames] = useState<string[]>([]);
	let [tablesQuery, setTablesQuery] = useState<string>("");

	const getDescribeTablesQuery = (
		tableList: RowDataPacket[]
	):
		| { tableNames: string[]; describeTablesQuery: string }
		| undefined => {
		if (tableList.length === 0) return undefined;
		const keys = Object.keys(tableList[0]);
		if (keys.length === 0) return undefined;

		const tableNames = tableList.map(row =>
			capitalize(row[keys[0]])
		);

		const queries = tableNames.map(
			tableName => `DESCRIBE ${tableName};`
		);

		return { tableNames, describeTablesQuery: queries.join("\n") };
	};

	async function handleDescribeAllTables() {
		const tableList = await doMySqlQuery("show tables");
		const tablesInfo = getDescribeTablesQuery(tableList);
		if (tablesInfo === undefined) return;

		const results = await doMultiMySqlQuery(
			tablesInfo.describeTablesQuery
		);

		setTables(results);
		setTableNames(tablesInfo.tableNames);
		setTablesQuery(tablesInfo.describeTablesQuery);
	}

	function handleClearAllTables() {
		setTables([]);
		setTableNames([]);
		setTablesQuery("");
	}

	const codeBlockProps: CodeBlockProps = {
		codeString: tablesQuery,
		language: "sql",
	};

	const TablesUI = () => {
		if (tables.length === 0 || tableNames.length === 0) {
			return null;
		}
		if (tables.length !== tableNames.length) {
			console.error(
				"Tables and tableNames arrays have different lengths"
			);
			return null;
		}

		const getTablesUI = () => {
			return tables.map((table, i) => {
				const keyValue = `table-${i}`;
				return (
					<QueryResultsTable
						key={keyValue}
						// keyProp={keyValue}
						tableRows={table}
						tableTitle={tableNames[i]}
						useScrollArea={false}
					/>
				);
			});
		};

		return (
			<div>
				<CodeBlock {...codeBlockProps} />

				{getTablesUI()}
			</div>
		);
	};

	return (
		<>
			<Group my="md">
				<Button onClick={handleDescribeAllTables}>
					Do query
				</Button>
				<Button onClick={handleClearAllTables} disabled={!tables}>
					Clear Results
				</Button>
			</Group>
			<Suspense fallback={<Title>Loading...</Title>}>
				<TablesUI />
			</Suspense>
		</>
	);
}
