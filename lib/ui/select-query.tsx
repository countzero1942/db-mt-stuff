"use client";

import {
	cleanMySqlQuery,
	cleanMySqlQueryArray,
} from "@/client-data/mysql";
import { Customer, doMySqlQuery } from "@/server/mysql-a";
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
import { log, table } from "console";
import { get } from "http";
import { set, splitWords } from "moderndash";
import { RowDataPacket } from "mysql2/promise";
import React, { Suspense, useState } from "react";

export type ResultsTableProps = {
	tableRows?: RowDataPacket[];
	tableTitle?: string;
	useTitleSplitting?: boolean;
	useScrollArea?: boolean;
};

export const QueryResultsTable: React.FC<ResultsTableProps> = ({
	tableRows,
	tableTitle,
	useTitleSplitting,
	useScrollArea,
}: ResultsTableProps) => {
	if (!tableRows) {
		return <></>;
	}

	const safeTableTitle = tableTitle ?? "Results";
	const safeUseScrollArea = useScrollArea ?? true;
	const safeUseTitleSplitting = useTitleSplitting ?? true;

	if (tableRows.length === 0) {
		return (
			<>
				<h3>{safeTableTitle}</h3>
				<p>No customers found.</p>
			</>
		);
	}

	const tableKeys = Object.keys(tableRows[0]);

	const tableTitles = safeUseTitleSplitting
		? tableKeys.map(tableKey => splitWords(tableKey).join(" "))
		: tableKeys;

	const tableHeadRow = (
		<TableTr>
			{tableTitles.map(title => (
				<TableTh key={title}>{title}</TableTh>
			))}
		</TableTr>
	);

	const tableRowsUI = tableRows.map((row, index) => (
		<TableTr key={`row: ${index}`}>
			{tableKeys.map((key, index) => (
				<TableTd key={`${key}-${index}`}>{row[key]}</TableTd>
			))}
		</TableTr>
	));

	const TheTable = () => {
		if (safeUseScrollArea) {
			return (
				<div>
					<h3>{safeTableTitle}</h3>
					<ScrollArea
						type="auto"
						h={300}
						offsetScrollbars="y"
						bd="1px solid var(--mantine-color-default-border)"
						my="md"
					>
						<Table stickyHeader striped withColumnBorders>
							<TableThead>{tableHeadRow}</TableThead>
							<TableTbody>{tableRowsUI}</TableTbody>
						</Table>
					</ScrollArea>
				</div>
			);
		}
		return (
			<div>
				<h3>{safeTableTitle}</h3>
				<Table
					striped
					withColumnBorders
					bd="1px solid var(--mantine-color-default-border)"
				>
					<TableThead>{tableHeadRow}</TableThead>
					<TableTbody>{tableRowsUI}</TableTbody>
				</Table>
			</div>
		);
	};

	return (
		<Suspense key={Math.random() + 10} fallback={<p>Loading...</p>}>
			<TheTable />
		</Suspense>
	);
};

export type QuerySectionProps = {
	sqlQuery: string;
	title: string;
	description?: string;
	hasRowNumbersWrapper?: boolean;
	useTitleSplitting?: boolean;
	useScrollArea?: boolean;
};

export default function QuerySection({
	sqlQuery,
	title,
	description,
	hasRowNumbersWrapper,
	useTitleSplitting,
	useScrollArea,
}: QuerySectionProps) {
	const getCleanedQuery = () => {
		if (hasRowNumbersWrapper) {
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

	let [rows, setRows] = useState<RowDataPacket[] | undefined>(
		undefined
	);

	const codeBlockProps: CodeBlockProps = {
		codeString: cleanedSqlQuery,
		language: "sql",
	};

	async function handleSelectAllCustomers() {
		const results = await doMySqlQuery(cleanedSqlQuery);
		setRows(results);
	}

	function handleClearAllCustomers() {
		setRows(undefined);
	}

	const Description = () => {
		if (description) {
			return <p>{description}</p>;
		}
		return null;
	};

	const useTitleSplittingDefault = useTitleSplitting ?? true;

	return (
		<>
			<h2>{title}</h2>
			<Description />
			<CodeBlock {...codeBlockProps} />
			<Group my="md">
				<Button onClick={handleSelectAllCustomers}>
					Do query
				</Button>
				<Button
					onClick={handleClearAllCustomers}
					disabled={!rows}
				>
					Clear Results
				</Button>
			</Group>
			<Suspense
				key={Math.random() + 9}
				fallback={<Title>Loading...</Title>}
			>
				<QueryResultsTable
					tableRows={rows}
					useTitleSplitting={useTitleSplittingDefault}
					useScrollArea={useScrollArea}
				/>
			</Suspense>
		</>
	);
}
