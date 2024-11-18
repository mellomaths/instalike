import express from "express";


const app = express();

app.get("/api", (req, res) => {
  res.status(200).json({ message: "Hello from server!" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
