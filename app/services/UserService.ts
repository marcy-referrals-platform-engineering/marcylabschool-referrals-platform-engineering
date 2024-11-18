import { apiFetch } from "../utils/globalUtils";


export default class UserService {
    static async search(query: string,fetchAll: boolean = true) {
        const response = await apiFetch(`/api/user/search?query=${query}${!fetchAll ? '&fetchAll=false' : ''}`);
        if (!response) {
            console.log("Failed to search users");
            return [];
        }
        return response;
    }

    static async setRelation(email: string, relation: string) {
        const response = await apiFetch(`/api/user/set-relation`, 'PATCH', { email, relation });
    }
  
}