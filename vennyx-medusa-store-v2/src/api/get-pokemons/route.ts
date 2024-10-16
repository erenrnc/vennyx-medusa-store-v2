import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import PostModuleService from "../../modules/post/service"

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const postModuleService: PostModuleService = req.scope.resolve(
        "postModuleService"
    )

    const parseQueryParam = (param: string | string[] | undefined): number => {
        if (Array.isArray(param)) {
            param = param[0]; // If array, use the first element
        }
        return param && !isNaN(Number(param)) ? parseInt(param, 10) : undefined;
    };

    const limit = parseQueryParam(req.query?.limit as string | string[]) || 20;
    const offset = parseQueryParam(req.query?.offset as string | string[]) || 0;

    res.json({
        message: await postModuleService.getMessage(limit, offset),
    })
}