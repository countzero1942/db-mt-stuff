import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
	dark,
	coldarkDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";

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
