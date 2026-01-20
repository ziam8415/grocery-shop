// src/server.ts
import app from "./app";
import { authRoute } from "./modules/auth/auth.routes";

app.use("/api/auth", authRoute);
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
