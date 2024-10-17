import PostModuleService from "../../modules/post/service";
import { MedusaRequest, MedusaResponse } from "@medusajs/framework";  

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const postModuleService: PostModuleService = req.scope.resolve("postModuleService")

    try {
        const items= await postModuleService.getItems();
        res.status(200).json(items);
    } catch (error) {
        console.error("Item'lar? çekerken hata olu?tu:", error);
        res.status(500).json({ error: error.message });
    }
}