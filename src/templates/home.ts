import { Response } from "express";
import { PageData, newPageData } from "./templates";

export type HomePageData = PageData & {};

export function homePage(res: Response, status: number) {
  const pageData = newPageData();
  const data: HomePageData = {
    ...pageData,
    title: "Home",
    page: "home",
    path: "/",
  };
  res.status(status).render("base", data);
}
