import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middleware/error.middleware";
import businessRoutes from "./routes/business.routes";
import productRoutes from "./routes/product.routes";
import categoryRoutes from "./routes/category.routes";
import orderRoutes from "./routes/order.routes";
import productreviewRoutes from "./routes/productreview.routes";
import serviceRoutes from "./routes/service.routes";
import bookingRoutes from "./routes/booking.routes";
import servicereviewRoutes from "./routes/servicereview.routes";




const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", productreviewRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews",servicereviewRoutes);



app.get("/", (req, res) => {
  res.send("SocioMart API running...");
});

app.use(errorHandler);


export default app;