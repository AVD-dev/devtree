import { Router } from "express";

const router = Router();

router.get("/", (req, res) => res.send("Hola mundoooo"));
router.get("/foo", (req, res) => res.send("Foo works"));

export default router;
