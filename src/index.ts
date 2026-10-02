import app from "./server/server.ts";

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running port: ${port}`));
