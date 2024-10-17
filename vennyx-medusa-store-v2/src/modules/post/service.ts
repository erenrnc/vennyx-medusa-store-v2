import {
    MedusaService,
    InjectManager,
    MedusaContext
} from "@medusajs/utils";
import { EntityManager } from "@mikro-orm/core";
import Pokeitem from "../models/pokemonItem";
import { Context, DAL } from "@medusajs/framework/types";
import { InjectTransactionManager } from "@medusajs/framework/utils";
import Pokemon from "../models/pokemonModel";

const axios = require("axios");

type InjectedDependencies = {
    baseRepository: DAL.RepositoryService
}

class PostModuleService extends MedusaService({ Pokeitem }) {
    protected baseRepository_: DAL.RepositoryService

    constructor({ baseRepository }: InjectedDependencies) {
        super(...arguments)
        this.baseRepository_ = baseRepository
    }

    async getMessage(limit: number, offset: number) {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
        return JSON.stringify(response.data);
    }

    async getPokeInfo(name: string) {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

            const pokemonData = response.data;

            console.log(pokemonData);

            const img = pokemonData.sprites?.front_default || "https://via.placeholder.com/96"; 
            const type = pokemonData.types?.[0]?.type?.name || "Unknown";
            const pokemon = new Pokemon(pokemonData.name, img, pokemonData.id, type);
            return JSON.stringify(pokemon);
        } catch (error) {
            console.error("Dış API'den veri çekilemedi:", error);
            throw new Error("Veri çekilemedi");
        }
    }

    async getItems() {
        try {
            return await this.listPokeitems()
        }
        catch (error) {
            console.error("Error in getItems:", error);
            throw new Error("Error retrieving items");
        }
    }

    async deleteItem(id) {
        try {
            await this.deletePokeitems(id)
            return true; 
        } catch (error) {
            console.error("Error in deleteItem:", error);
            throw new Error("Error deleting item");
        }
    }

    async createItem(data: { name: string, img: string, type: string }[]) {
        try {
            const items = await this.createPokeitems(data);
            return items;
        } catch (error) {
            console.error("Error in deleteItem:", error);
            throw new Error("Error deleting item");
        }
    }
}

export default PostModuleService