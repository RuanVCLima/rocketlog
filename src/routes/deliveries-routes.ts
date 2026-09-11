import { Router } from "express";

import { DeliveriesController } from "@/controllers/deliveries-controllers";

import { ensureAuthenticator } from "@/middlewares/ensure-authenticator";

const deliveriesRoutes = Router()
const deliveriesController =  new DeliveriesController()

deliveriesRoutes.use( ensureAuthenticator)


deliveriesRoutes.post("/", deliveriesController.create)

export {deliveriesRoutes}