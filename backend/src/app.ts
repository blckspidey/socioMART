import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middleware/error.middleware";
import businessRoutes from "./routes/business.routes";




const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/business", businessRoutes);

app.get("/", (req, res) => {
  res.send("SocioMart API running...");
});

app.use(errorHandler);


export default app;