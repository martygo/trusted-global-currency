import { PostgrestError } from "@supabase/supabase-js";

import supabaseClient from "@/config/supabase";

export namespace Queries {
	const supabase = supabaseClient();

	export async function insert(table: string, dataBatch: []) {
		try {
			const { data, error } = await supabase
				.from(table)
				.insert(dataBatch)
				.select();

			if (error) throw error;

			return data;
		} catch (error: PostgrestError | any) {
			console.error("Error insert:", error.message, error.details);
			return null;
		}
	}

	export async function update(
		table: string,
		value: number | string,
		column: { key: string; value: string },
	) {
		try {
			const { data, error } = await supabase
				.from(table)
				.update({ value })
				.eq(column.key, column.value)
				.select();

			if (error) throw error;

			return data;
		} catch (error: PostgrestError | any) {
			console.error("Error updating:", error.message, error.details);
			return null;
		}
	}
}
