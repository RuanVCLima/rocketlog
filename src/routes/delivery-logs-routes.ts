import { Router } from "express";

import { DeliveryLogsController } from "@/controllers/delivery-logs-controller";

import { ensureAuthenticator } from "@/middlewares/ensure-authenticator";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";


const deliveryLogsRoutes = Router()
const deliveryLogsController = new DeliveryLogsController()

deliveryLogsRoutes.post(
    "/", 
    ensureAuthenticator,
    verifyUserAuthorization(["sale"]),
    deliveryLogsController.create
)

export {deliveryLogsRoutes}