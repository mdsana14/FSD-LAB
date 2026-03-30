const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;

    // Get data from query
    const name = query.name || "Sana";
    const age = query.age || "20";
    const email = query.email || "mailmdsana@gmail.com";

    // Response
    res.writeHead(200, { "Content-Type": "text/html" });

    res.write("<h1>Form Data Received</h1>");
    res.write("<p>Here is your data:</p>");

    res.write(`
        <ul>
            <li>Name: ${name}</li>
            <li>Age: ${age}</li>
            <li>Email: ${email}</li>
        </ul>
    `);

    res.end();
});

server.listen(4000, () => {
    console.log("Server running at http://localhost:4000");
});