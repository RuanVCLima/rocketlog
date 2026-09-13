import { Router } from "express";

import { DeliveriesController } from "@/controllers/deliveries-controllers";

import { ensureAuthenticator } from "@/middlewares/ensure-authenticator";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const deliveriesRoutes = Router()
const deliveriesController =  new DeliveriesController()

deliveriesRoutes.use( ensureAuthenticator, verifyUserAuthorization(["sale"]))

deliveriesRoutes.post("/", deliveriesController.create)
deliveriesRoutes.get("/", deliveriesController.index)

export {deliveriesRoutes}