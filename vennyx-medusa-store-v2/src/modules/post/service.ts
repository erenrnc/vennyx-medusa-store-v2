import {
    MedusaService,
    InjectManager,
    MedusaContext
} from "@medusajs/utils";
import { EntityManager } from "@mikro-orm/core";
import  Pokeitem  from "../models/pokemonItem";
import { Context, DAL } from "@medusajs/framework/types";
import { InjectTransactionManager } from "@medusajs/framework/utils";

const axios = require("axios");

type InjectedDependencies = {
    baseRepository: DAL.RepositoryService
}

class PostModuleService extends MedusaService({Pokeitem}) {
    protected baseRepository_: DAL.RepositoryService

    constructor({ baseRepository }: InjectedDependencies) {
        super(...arguments)
        this.baseRepository_ = baseRepository
    }

    async getMessage(limit: number, offset: number) {
        const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
        );
        return JSON.stringify(response.data);
    }

    async getItems() {
        try {
            const itemRepository = await this.listPokeitems()
            console.log(itemRepository);
            return itemRepository;
        } catch (error) {
            console.error("Error in getItems:", error);
            throw new Error("Error retrieving items");
        }
    }
}

export default PostModuleService