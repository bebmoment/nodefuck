/* 
Example of what the obfuscated code actually evaluates to
Precisely what we have to do to get modules imported and http server started
*/
Function(`
async function startServer(port) {
  const http = await import('http');
  http.createServer(
    (req, res) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end("wsg gang")
    }
  ).listen(port, () => {
    console.log("Server running on port " + port);
  })
}

startServer(9000);
`)()
