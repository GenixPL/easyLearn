import { environment } from "~/environments/environment";

export function log(message: string) {
	if (!environment.production) { //TODO: do service'u
		console.log(message);
	} else {
		console.log(`No logging from logger because: environment.procution==${environment.production}`);
	}
}