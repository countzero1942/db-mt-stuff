import SelectCustomersSection from "@/app/w3schools-mysql/select-basics/select-customers";
import { cleanMultiLineString } from "@/utils/string";
import { Divider } from "@mantine/core";

export default function SelectBasicsPage() {
	const sqlLast10Customers = `
		SELECT * FROM
		(
			SELECT * FROM customers 
			ORDER BY CustomerID DESC 
			LIMIT 10
		) AS sub
		ORDER BY CustomerID ASC;   
	`;

	const sqlLast10CustomersWithOffset = `
		SELECT * FROM customers
		ORDER BY CustomerID DESC
		LIMIT 10 OFFSET (n - 10);
	`;
	// ... rest of the page content...
	return (
		<article>
			<h1>SELECT Basics</h1>

			<p>
				In this section we will explore the basics of using MySql
				SELECT commands.
			</p>

			<SelectCustomersSection
				title="SELECT all from Customers"
				sqlQuery="select * from customers"
			/>

			<Divider my="2rem" />

			<SelectCustomersSection
				title="SELECT all from Customers with limit 10"
				sqlQuery="select * from customers limit 10"
			/>

			<Divider my="2rem" />

			<SelectCustomersSection
				title="SELECT all from Customers: last 10 with offset"
				sqlQuery={cleanMultiLineString(sqlLast10Customers)}
			/>

			<Divider my="2rem" />

			<SelectCustomersSection
				title="SELECT all from Customers: limit last 10"
				sqlQuery={cleanMultiLineString(
					sqlLast10CustomersWithOffset
				)}
			/>

			<Divider my="2rem" />
		</article>
	);
}
