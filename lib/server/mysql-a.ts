"use server";

import { getErrorMessage } from "@/utils/error";
import { div, logobj } from "@/utils/log";
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

const host = "172.27.80.1";
const user = "me";
const password = "xB6s#ZydFycuI^C";
const database = "w3schools";
const port = 3306;

const access: ConnectionOptions = {
	host,
	user,
	password,
	database,
	port,
};

const multiAccess: ConnectionOptions = {
	host,
	user,
	password,
	database,
	port,
	multipleStatements: true,
};

export const doMySqlQuery = async (
	query: string
): Promise<RowDataPacket[]> => {
	try {
		const conn = await mysql.createConnection(access);

		const [rows] = await conn.query<RowDataPacket[]>(query);

		conn.end();

		return rows;
	} catch (err) {
		log(getErrorMessage(err));
		return [];
	}
};

export const doMultiMySqlQuery = async (
	query: string
): Promise<RowDataPacket[][]> => {
	try {
		const conn = await mysql.createConnection(multiAccess);

		const [results] = await conn.query<RowDataPacket[][]>(query);

		conn.end();

		return results;
	} catch (err) {
		log(getErrorMessage(err));
		return [];
	}
};
