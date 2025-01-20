// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import sql from "react-syntax-highlighter/dist/esm/languages/prism/sql";
import {
	dark,
	coldarkDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
SyntaxHighlighter.registerLanguage("sql", sql);

export type CodeBlockProps = {
	codeString: string;
	language: string;
};

export const CodeBlock = (props: CodeBlockProps) => {
	return (
		<SyntaxHighlighter
			language={props.language}
			style={coldarkDark}
		>
			{props.codeString}
		</SyntaxHighlighter>
	);
};
