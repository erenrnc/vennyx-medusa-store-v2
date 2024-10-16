const axios = require("axios");

class PostModuleService {
    async getMessage(limit: number, offset: number) {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
        return JSON.stringify(response.data);
    }
}

export default PostModuleService