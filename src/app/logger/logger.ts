import { environment } from "~/environments/environment.prod";

export function log(message: string) {
	if (!environment.production) {
		console.log(message);
	}
}