import { init } from "./server";

process.on('unhandledRejection', (err) => {
	console.error(err);
	process.exit(1);
});

process.on('uncaughtException', (err) => {
	console.error(err);
	process.exit(1);
});

init();