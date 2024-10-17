import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

export const step1 = createStep("step-1", async () => {
    return new StepResponse(`Hello from step one!`)
})