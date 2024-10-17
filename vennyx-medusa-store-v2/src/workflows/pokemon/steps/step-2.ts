import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

type StepInput = {
    name: string;
    img: string;
    type: string;
} | {
    name: string;
    img: string;
    type: string;
    }[];

export const step2 = createStep(
    "step-2",
    async (input: StepInput) => {
        return new StepResponse(`Hello ${input[0].name} from step two!`)
    }
)