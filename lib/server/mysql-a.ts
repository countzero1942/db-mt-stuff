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

export const doSelectQuery = async (
	query: string
): Promise<RowDataPacket[]> => {
	try {
		const conn = await mysql.createConnection(access);

		const [rows] = await conn.query<RowDataPacket[]>(query);

		conn.end();

		return rows;
	} catch (err) {
		log(err);
		return [];
	}
};

export const doMultiSelectQuery = async (
	query: string
): Promise<RowDataPacket[][]> => {
	try {
		const conn = await mysql.createConnection(multiAccess);

		const [results] = await conn.query<RowDataPacket[][]>(query);

		conn.end();

		return results;
	} catch (err) {
		log(err);
		return [];
	}
};

export const selectQuery = async (
	query: string
): Promise<RowDataPacket[]> => {
	try {
		const conn = await mysql.createConnection(access);

		const [customers] = await conn.query<RowDataPacket[]>(query);

		conn.end();

		return customers;
	} catch (err) {
		log(err);
		return [];
	}
};
