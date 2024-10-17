import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import PostModuleService from "../../modules/post/service"

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const postModuleService: PostModuleService = req.scope.resolve("postModuleService" )

    const name = req.query?.name as string;

    res.json(JSON.parse(await postModuleService.getPokeInfo(name)))
}