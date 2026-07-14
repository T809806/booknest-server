
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import bookRoutes from "./routes/book.routes";
const app = express();
// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://book-nest-client-nu.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
// Home Route
app.get("/", (req, res) => {
res.send("BookNest Server is Running");
});
// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/books", bookRoutes);
export default app;