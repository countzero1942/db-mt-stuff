"use server";

import { logobj } from "@/utils/log";
import { log } from "console";
import mysql, {
	ConnectionOptions,
	ResultSetHeader,
	RowDataPacket,
} from "mysql2/promise";

export interface Customer extends RowDataPacket {
	CustomerID: number;
	CustomerName: string;
	ContactName: string;
	Address: string;
	City: string;
	PostalCode: string;
	Country: string;
}

export const selectAllCustomers = async (): Promise<Customer[]> => {
	const access: ConnectionOptions = {
		host: "172.27.80.1",
		user: "me",
		password: "xB6s#ZydFycuI^C",
		database: "w3schools",
		port: 3306,
	};

	try {
		const conn = await mysql.createConnection(access);

		const [customers] = await conn.query<Customer[]>(
			"SELECT * FROM customers"
		);

		logobj(customers);

		conn.end();

		return customers;
	} catch (err) {
		log(err);
		return [];
	}
};
