import type {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/framework/http"
import myWorkflow from "../../workflows/pokemon"

export async function POST(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const items = req.body as { name: string, img: string, type: string }[];

    if (!Array.isArray(items)) {
        return res.status(400).json({ message: "Body must be an array of items" });
    }

    const { result } = await myWorkflow(req.scope)
        .run({
            input: items,
        })

    res.send(result)
}