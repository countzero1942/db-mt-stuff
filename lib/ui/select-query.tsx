"use client";

import {
	cleanMySqlQuery,
	cleanMySqlQueryArray,
} from "@/client-data/mysql";
import { Customer, doSelectQuery } from "@/server/mysql-a";
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

export type ResultsTableProps = {
	rows?: RowDataPacket[];
	title?: string;
	useTitleSplitting?: boolean;
	useScrollArea?: boolean;
};

export const ResultsTable = (props: ResultsTableProps) => {
	const rows = props.rows;
	if (!rows) {
		return <></>;
	}

	const title = props.title ?? "Results";
	const useScrollArea = props.useScrollArea ?? true;
	const useTitleSplitting = props.useTitleSplitting ?? true;

	if (rows.length === 0) {
		return (
			<>
				<h3>{title}</h3>
				<p>No customers found.</p>
			</>
		);
	}

	const keys = Object.keys(rows[0]);

	const titles = useTitleSplitting
		? keys.map(key => splitWords(key).join(" "))
		: keys;

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

	const TheTable = () => {
		if (useScrollArea) {
			return (
				<>
					<h3>{title}</h3>
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
		}
		return (
			<>
				<h3>{title}</h3>
				<Table
					striped
					withColumnBorders
					bd="1px solid var(--mantine-color-default-border)"
				>
					<TableThead>{tableHeadRow}</TableThead>
					<TableTbody>{tableRows}</TableTbody>
				</Table>
			</>
		);
	};

	return (
		<Suspense fallback={<p>Loading...</p>}>
			<TheTable />
		</Suspense>
	);
};

export type SelectCustomersSectionProps = {
	sqlQuery: string;
	title: string;
	description?: string;
	hasRowNumbersWrapper?: boolean;
	useTitleSplitting?: boolean;
	useScrollArea?: boolean;
};

export default function SelectQuerySection({
	sqlQuery,
	title,
	description,
	hasRowNumbersWrapper,
	useTitleSplitting,
	useScrollArea,
}: SelectCustomersSectionProps) {
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
		const results = await doSelectQuery(cleanedSqlQuery);
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
			<Suspense fallback={<Title>Loading...</Title>}>
				<ResultsTable
					rows={rows}
					useTitleSplitting={useTitleSplittingDefault}
					useScrollArea={useScrollArea}
				/>
			</Suspense>
		</>
	);
}
