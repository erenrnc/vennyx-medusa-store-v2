import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import PostModuleService from "../../modules/post/service"

export async function DELETE(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const postModuleService: PostModuleService = req.scope.resolve("postModuleService")

    const parseQueryParam = (param: string | string[] | undefined): number => {
        if (Array.isArray(param)) {
            param = param[0];
        }
        return param && !isNaN(Number(param)) ? parseInt(param, 10) : undefined;
    };

    const id = parseQueryParam(req.query?.id as string | string[]) || 0;

    res.json({
        message: await postModuleService.deleteItem(id),
    })
}