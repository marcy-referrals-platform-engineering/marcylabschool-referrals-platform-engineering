import { apiFetch } from "../utils/globalUtils";



export default class AuthService {

    static async sendAuthorizationRequest(email: string, name: string, img: string): Promise<boolean> {
        const wasRequestSuccessful = !!(await apiFetch('/api/auth/request-auth', 'POST', { email, name, img }))
        return wasRequestSuccessful
    };
    static async getUserRole(email: string): Promise<string> {
        const response = await apiFetch(`/api/auth/get-role?email=${email}`);
        return response.role;
    }

}
