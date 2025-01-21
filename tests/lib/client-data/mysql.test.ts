import { cleanMySqlQuery } from "@/client-data/mysql";
import { cleanMultiLineString } from "@/utils/string";

describe("cleanMySqlQuery", () => {
	it("Uppercases MySQL keywords", () => {
		const input = "select * from users where id = 1";
		const expected = "SELECT * FROM users WHERE id = 1";
		expect(cleanMySqlQuery(input)).toBe(expected);
	});

	it("Preserves non-keyword casing; handles already capitalized keywords", () => {
		const input =
			'SELECT name, age FROM userTable WHERE status = "active"';
		const expected =
			'SELECT name, age FROM userTable WHERE status = "active"';
		expect(cleanMySqlQuery(input)).toBe(expected);
	});

	it("Handles multi-line queries", () => {
		const input = `
			select id, name
			from users
			where age > 18
			order by name
			`;
		const expected = `
			SELECT id, name
			FROM users
			WHERE age > 18
			ORDER BY name
			`;
		expect(cleanMySqlQuery(input)).toBe(
			cleanMultiLineString(expected)
		);
	});

	it("Removes trailing spaces", () => {
		const input = "SELECT *   \nFROM users  \nWHERE id = 1  ";
		const expected = "SELECT *\nFROM users\nWHERE id = 1";
		expect(cleanMySqlQuery(input)).toBe(expected);
	});

	it("Removes all starting tabs from single line", () => {
		const input = "\t\tSELECT * FROM users WHERE id = 1";
		const expected = "SELECT * FROM users WHERE id = 1";
		expect(cleanMySqlQuery(input)).toBe(expected);
	});

	it("Handles custom tab characters", () => {
		const input = `
_________select *
_________from users
_________where id in (
____________select id
____________from active_users
_________)
		`;
		const expected = `
_________SELECT *
_________FROM users
_________WHERE id IN (
____________SELECT id
____________FROM active_users
_________)
		`;
		expect(cleanMySqlQuery(input, { tabString: "___" })).toBe(
			cleanMultiLineString(expected, { tabString: "___" })
		);
	});

	it("Handles custom tab characters with extra indents", () => {
		const input = `
_________select *
_________from users
_________where id in (
____________select id
____________from active_users
_________)
		`;
		const expected = `
_________SELECT *
_________FROM users
_________WHERE id IN (
____________SELECT id
____________FROM active_users
_________)
		`;
		expect(
			cleanMySqlQuery(input, { tabString: "___", extraIndents: 2 })
		).toBe(
			cleanMultiLineString(expected, {
				tabString: "___",
				extraIndents: 2,
			})
		);
	});

	it("Preserves indentation", () => {
		const input = `
			select *
			from users
			where id in (
				select id
				from active_users
			)
		`;
		const expected = `
			SELECT *
			FROM users
			WHERE id IN (
				SELECT id
				FROM active_users
			)
		`;
		expect(cleanMySqlQuery(input)).toBe(
			cleanMultiLineString(expected)
		);
	});

	it("Preserves indentation with extra indents", () => {
		const input = `
			select *
			from users
			where id in (
				select id
				from active_users
			)
		`;
		const expected = `
			SELECT *
			FROM users
			WHERE id IN (
				SELECT id
				FROM active_users
			)
		`;
		expect(cleanMySqlQuery(input, { extraIndents: 2 })).toBe(
			cleanMultiLineString(expected, { extraIndents: 2 })
		);
	});

	it("Adds an extra indent indentation", () => {
		const input = `
			select *
			from users
			where id in (
				select id
				from active_users
			)
		`;
		const expected = `
			SELECT *
			FROM users
			WHERE id IN (
				SELECT id
				FROM active_users
			)
		`;
		expect(cleanMySqlQuery(input)).toBe(
			cleanMultiLineString(expected)
		);
	});
});
