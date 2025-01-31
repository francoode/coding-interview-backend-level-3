import { initializeServer, startServer } from "./server"
import "reflect-metadata"

process.on('unhandledRejection', (err) => {
    console.error(err)
    process.exit(1)
})


startServer().catch((err) => {
    console.error(`StartServer Error: ${err}`);
});