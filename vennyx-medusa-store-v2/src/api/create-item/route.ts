import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import PostModuleService from "../../modules/post/service"

export async function POST(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const postModuleService: PostModuleService = req.scope.resolve("postModuleService")

    const items = req.body as { name: string, img: string, type: string }[];

    if (!Array.isArray(items)) {
        return res.status(400).json({ message: "Body must be an array of items" });
    }

    res.json(await postModuleService.createItem(items))
}