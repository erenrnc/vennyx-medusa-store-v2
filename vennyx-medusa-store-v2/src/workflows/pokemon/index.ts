import {
    createWorkflow,
    WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { WorkflowInput } from "../../modules/models/workflowInput";
import { step1 } from "./steps/step-1"
import { step2 } from "./steps/step-2"

const myWorkflow = createWorkflow(
    "pokemon",
    function (input: WorkflowInput) {
        const str1 = step1(input)
        const str2 = step2(input)

        return new WorkflowResponse({
            message: str1, str2
        })
    }
)

export default myWorkflow