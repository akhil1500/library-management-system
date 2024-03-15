const http = require('http');

const port = normalizePort(process.env.PORT || 3000);

function normalizePort(val) {
	const port1 = parseInt(val, 10);
	if (isNaN(port1)) {
		return val;
	}
	if (port1 >= 0) {
		return port1;
	}
	return false;
}
function onError(error){
    const bind = typeof port === 'string'
        ?   `Pipe ${ port}`
        :   `Port ${ port}`
    switch(error.code){
        case "EACCES":
            console.log(`${bind  } requires elevated privileges`,{});
            process.exit(1);
        case "EADDRINUSE":
            console.log(`${bind  } is already in use`,{});
		    process.exit(1);
        default:
            throw error;
    }
}

function onListening(server){
    const addr = server.address();
    const bind = typeof port === 'string'
       ?   `Pipe ${ addr}`
        :   `Port ${ addr.port}`
    console.log(`Listening on ${bind}`)

}

function setToEnv(secret){
    process.env.MONGO_CONFIG = JSON.stringify(secret.MONGO_CONFIG || {});
}

async function fetchSecrets(){
    const parseSecret = require("./secrets_development.json");
    setToEnv(parseSecret);
}

async function start(){
    await fetchSecrets()
    const connectToMongo = require("./mongoose/index");
    const mongoDb = connectToMongo();
    
    const app = require("./app").startApp(mongoDb);
    app.set('port', port);
    const server = http.createServer(app);

    server.listen(port, (req, res)=>{
        console.log("Server is running!!");
    })
    server.on("error", onError);
    server.on("listening", () => onListening(server));
}


if(require.main === module){
    start();
}