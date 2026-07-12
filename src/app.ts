import express from "express";
import authRoutes from "./routes/auth.routes";
import bookRoutes from "./routes/book.routes";

const app = express();

app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("BookNest Server is Running");
});

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/books", bookRoutes);

export default app;