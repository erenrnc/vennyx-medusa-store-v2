import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import PostModuleService from "../../modules/post/service"

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const postModuleService: PostModuleService = req.scope.resolve(
        "postModuleService"
    )

    const limit = parseInt(req.query?.limit) || 20;
    const offset = parseInt(req.query?.offset) || 0;

    res.json({
        message: await postModuleService.getMessage(limit, offset),
    })
}