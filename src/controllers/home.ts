import { Router, Request, Response } from "express";
import { homePage } from "../templates/home";

export class HomeController {
  public readonly router = Router();

  constructor() {
    this.router.get("/", this.homeView);
  }

  homeView = (_: Request, res: Response) => {
    return homePage(res, 200);
  };
}
