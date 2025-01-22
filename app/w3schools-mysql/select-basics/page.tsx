import QuerySection from "@/ui/select-query";
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

	const sqlSelectColumnsUSAUSAUSA = `
		select CustomerID, CustomerName, City 
			from Customers
		where Country='USA'	
	`;

	const sqlDistinctCountriesNumbered = `
		select @i:=@i+1 AS 'Row', q.* from
		(
			select distinct Country from Customers
			order by Country asc
		) as q,
		(SELECT @i:=0) AS x	
	`;

	const descriptionSelectColumnsUSAUSAUSA = `
		SQL query is wrapped in a subquery
		to add a row number column using 
		'hasRowNumbersWrapper' prop.`;

	return (
		<article>
			<h1>SELECT Basics</h1>

			<p>
				In this section we will explore the basics of using MySql
				SELECT commands.
			</p>

			<QuerySection
				title="SELECT all columns from Customers"
				sqlQuery="select * from Customers"
			/>

			<Divider my="2rem" />

			<QuerySection
				title="SELECT all columns from Customers with limit 10"
				sqlQuery="select * from Customers limit 10"
			/>

			<Divider my="2rem" />

			<QuerySection
				title="SELECT last 10 Customers"
				sqlQuery={sqlLast10Customers}
			/>

			<Divider my="2rem" />

			<QuerySection
				title="SELECT Customers from Mexico with WHERE"
				sqlQuery={sqlCustomersFromMexico}
			/>

			<Divider my="2rem" />

			<QuerySection
				title="SELECT DISTINCT Country from Customers"
				sqlQuery="SELECT DISTINCT Country FROM Customers;"
			/>

			<Divider my="2rem" />

			<QuerySection
				title="SELECT DISTINCT Countries with Row number"
				sqlQuery={sqlDistinctCountriesNumbered}
			/>

			<Divider my="2rem" />

			<QuerySection
				title="SELECT specific columns: USA! USA! USA!"
				sqlQuery={sqlSelectColumnsUSAUSAUSA}
				hasRowNumbersWrapper={true}
				description={descriptionSelectColumnsUSAUSAUSA}
			/>

			<Divider my="2rem" />
		</article>
	);
}
