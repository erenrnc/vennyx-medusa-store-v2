import { Pokeitem } from "../../../modules/models/pokemonItem"
import { StepInput } from "../../../modules/models/stepInput";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { InjectManager } from "@medusajs/utils";
import { EntityManager } from "@mikro-orm/core";

export const step2 = createStep(
    "step-2",
    async (input: StepInput, { container }) => {
        try {
            const postModuleService = container.resolve("postModuleService");
            console.log(input);
            const existingItem = await postModuleService.createItem(input);
            if (existingItem.length !== 0) {
                return new StepResponse(`Kaydetme yapıldı`)
            } else {
                return new StepResponse(`Kaydetme yapılamadı`)
            }
        } catch (error) {
            return new StepResponse(`Error while checking item: ${error.message}`)
        }
    }
)