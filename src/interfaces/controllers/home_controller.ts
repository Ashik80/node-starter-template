import { Request, Response, Router } from "express";
import { templateRegistry } from "../../infrastructure/renderer/template_registry";

const router = Router();

router.get("/", renderHomePage);

function renderHomePage(_: Request, res: Response) {
  const pageData = templateRegistry.get("home");

  return res.status(200).render("base", pageData);
}

export default router;
