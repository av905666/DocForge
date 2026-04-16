const app = require("./src/app");
const cors = require("cors");
const PORT=5000;

app.use(
  cors({
    origin: "https://doc-forge-one.vercel.app",
  })
);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});