import "dotenv/config";
import express from "express";

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
	res.json({ message: "Hello from Express server!" });
});

app.get("/health", (req, res) => {
	res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
