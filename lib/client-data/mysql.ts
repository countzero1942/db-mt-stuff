import {
	cleanMultiLineArray,
	getRepeatingMatchesCount,
} from "@/utils/string";

const mysqlKeywords = [
	"ALTER",
	"AND",
	"AS",
	"ASC",
	"AUTO_INCREMENT",
	"BETWEEN",
	"BY",
	"CASCADE",
	"CASE",
	"COMMIT",
	"CONSTRAINT",
	"CREATE",
	"DATABASE",
	"DEFAULT",
	"DELETE",
	"DESC",
	"DISTINCT",
	"DROP",
	"ELSE",
	"END",
	"EXISTS",
	"FALSE",
	"FOREIGN",
	"FROM",
	"FULL",
	"FUNCTION",
	"GRANT",
	"GROUP",
	"HAVING",
	"INDEX",
	"INNER",
	"INSERT",
	"INTO",
	"IS",
	"IN",
	"JOIN",
	"KEY",
	"LEFT",
	"LIKE",
	"LIMIT",
	"NOT",
	"NULL",
	"OFFSET",
	"ON",
	"OR",
	"ORDER",
	"OUTER",
	"PRIMARY",
	"PROCEDURE",
	"REGEXP",
	"RESTRICT",
	"REVOKE",
	"RIGHT",
	"ROLLBACK",
	"SAVEPOINT",
	"SCHEMA",
	"SELECT",
	"SET",
	"TABLE",
	"TEMPORARY",
	"THEN",
	"TRANSACTION",
	"TRIGGER",
	"TRUNCATE",
	"TRUE",
	"UNION",
	"UNIQUE",
	"UPDATE",
	"VALUES",
	"VIEW",
	"WHEN",
	"WHERE",
];

const mysqlKeywordSet = new Set(mysqlKeywords);

export const cleanMySqlQueryArray = (
	lines: string[],
	options?: {
		tabString?: string;
		extraIndents?: number;
	}
): string[] => {
	const tabString = options?.tabString ?? "\t";
	const extraIndents = options?.extraIndents ?? 0;

	const extraIndentString =
		extraIndents > 0 ? tabString.repeat(extraIndents) : "";

	lines = cleanMultiLineArray(lines, { tabString: tabString });

	lines = lines.map(line => {
		const numTabs = getRepeatingMatchesCount(line, tabString);
		const indent = line.slice(0, numTabs * tabString.length);
		const content = line.slice(numTabs * tabString.length);

		const words = content.split(/\s+/);
		const cleanedWords = words.map(word => {
			const upperCaseWord = word.toUpperCase();
			return mysqlKeywordSet.has(upperCaseWord)
				? upperCaseWord
				: word;
		});
		return `${extraIndentString}${indent}${cleanedWords.join(" ")}`;
	});

	return lines;
};

export const cleanMySqlQuery = (
	query: string,
	options?: {
		tabString?: string;
		extraIndents?: number;
	}
) => {
	let lines = query.split("\n").map(line => line.trimEnd());

	// lines = cleanMultiLineArray(lines, tabString);

	// lines = lines.map(line => {
	// 	const numTabs = getRepeatingMatchesCount(line, tabString);
	// 	const indent = line.slice(0, numTabs * tabString.length);
	// 	const content = line.slice(numTabs * tabString.length);

	// 	const words = content.split(/\s+/);
	// 	const cleanedWords = words.map(word => {
	// 		const upperCaseWord = word.toUpperCase();
	// 		return mysqlKeywordSet.has(upperCaseWord)
	// 			? upperCaseWord
	// 			: word;
	// 	});
	// 	return `${indent}${cleanedWords.join(" ")}`;
	// });

	lines = cleanMySqlQueryArray(lines, options);

	return lines.join("\n");
};
