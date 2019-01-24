import { ELSetInterface } from "./el-set";
import { isUndefined } from "util";

import { log } from '../logger/logger';


export interface ELSetValidationResult {
	is_valid: boolean,
	err: string
}

export function validateSet(set: ELSetInterface):ELSetValidationResult {
	let result = {
		is_valid: true,
		err: ``
	}

	if (isUndefined(set.set_name) || set.set_name.length == 0) {
		result.is_valid = false;
		result.err += `Set name can't be empty\n`;
	}

	if (isUndefined(set.language1)) {
		result.is_valid = false;
		result.err += `First language can't be empty\n`;
	}

	if (isUndefined(set.language2)) {
		result.is_valid = false;
		result.err += `Second language can't be empty\n`;
	}

	if (result.is_valid) {
		log(`set is valid`);
	} else {
		log(`set is invalid`);
	}

	return result;
}