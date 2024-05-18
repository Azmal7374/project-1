import express, { NextFunction, Request, Response } from "express";
// import { userInfo } from 'os';
const app = express();
//parser
app.use(express.json());
app.use(express.text());

const userRouter = express.Router();
const courseRouter = express.Router();

app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);
userRouter.post("/create-user", (req: Request, res: Response) => {
  const user = req.body;
  // console.log(user);
  res.json({
    success: true,
    message: "User is Created Successfully",
    data: user,
  });
});

courseRouter.post("/create-course", (req: Request, res: Response) => {
  const course = req.body;
  // console.log(course);

  res.json({
    success: true,
    message: "Course is Created Successfully",
    data: course,
  });
});

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url, req.method, req.hostname);
  next();
};

app.get(
  "/",
  logger,
  async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.query)

    try {
      res.send("something");
    } catch (err) {
      // console.log(err);
      next(err);
      // res.status(400).json(
      //     {
      //         success: false,
      //         message:"failed to get data",

      //     })
    }
  },
);

app.post("/", logger, (req: Request, res: Response) => {
  console.log(req.body);
  //   res.send("Got Data!")
  res.json({
    message: "successfully received data",
  });
});

app.all("*", (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: "Route Not Found",
  });
});
//global error handeler
app.use((error: string, req: Request, res: Response) => {
  if (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

export default app;
