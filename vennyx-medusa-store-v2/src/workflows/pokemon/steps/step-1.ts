import { Pokeitem } from "../../../modules/models/pokemonItem"
import { StepInput } from "../../../modules/models/stepInput";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { InjectManager } from "@medusajs/utils";
import { EntityManager } from "@mikro-orm/core";

export const step1 = createStep(
    "step-1",
    async (input: StepInput, { container }) => {
        try {
            const postModuleService = container.resolve("postModuleService");
            console.log(input[0].name);
            const existingItem = await postModuleService.getPokeInfo(input[0].name);
            if (existingItem.length !== 0) {
                return new StepResponse(true)
            } else {
                return new StepResponse(`Item does not exist in the database.`)
            }
        } catch (error) {
            return new StepResponse(`Error while checking item: ${error.message}`)
        }
    }
)