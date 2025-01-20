import SelectCustomersSection from "@/app/w3schools-mysql/select-basics/select-customers";
import { cleanMySqlQuery } from "@/client-data/mysql";
import { cleanMultiLineString } from "@/utils/string";
import { Divider } from "@mantine/core";

export default function SelectBasicsPage() {
	const sqlLast10Customers = `
		select * from
		(
			select * from Customers 
			order by CustomerID desc 
			limit 10
		) as x
		order by CustomerID asc;   
	`;

	const sqlCustomersFromMexico = `
		SELECT * FROM Customers 
		WHERE Country = 'Mexico';
   `;

	const sqlSelectColumns = `
		select CustomerID, CustomerName, City from Customers
		where Country='USA'	
	`;

	return (
		<article>
			<h1>SELECT Basics</h1>

			<p>
				In this section we will explore the basics of using MySql
				SELECT commands.
			</p>

			<SelectCustomersSection
				title="SELECT all columns from Customers"
				sqlQuery="select * from Customers"
			/>

			<Divider my="2rem" />

			<SelectCustomersSection
				title="SELECT all columns from Customers with limit 10"
				sqlQuery="select * from Customers limit 10"
			/>

			<Divider my="2rem" />

			<SelectCustomersSection
				title="SELECT last 10 Customers"
				sqlQuery={sqlLast10Customers}
			/>

			<Divider my="2rem" />

			<SelectCustomersSection
				title="SELECT Customers from Mexico with WHERE"
				sqlQuery={sqlCustomersFromMexico}
			/>

			<Divider my="2rem" />

			<SelectCustomersSection
				title="SELECT columns from Customers"
				sqlQuery={sqlSelectColumns}
			/>

			<Divider my="2rem" />
		</article>
	);
}
