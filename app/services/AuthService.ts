import { apiFetch } from "../utils/globalUtils";



export default class AuthService {

    static async sendAuthorizationRequest(email: string, name: string, img: string): Promise<boolean> {
        const wasRequestSuccessful = !!(await apiFetch('/api/auth/auth-request/create', 'POST', { email, name, img }))
        return wasRequestSuccessful
    };
    static async getUserRole(email: string): Promise<string> {
        const response = await apiFetch(`/api/auth/get-role?email=${email}`);
        return response.role;
    }

    static async getAuthRequests(): Promise<any[]> {
        try {
            const response = await apiFetch('/api/auth/auth-request', 'GET');
            if (!response) {
                console.log("Failed to get requests");
                return [];
            }
            return response;
        } catch(error) {
            console.error("Error getting requests:", error);
            return [];
        }
    }
    
    static async handleAuthRequest(requestId: number, shouldAccept: boolean): Promise<boolean> {
        try {
        
            const response = await apiFetch('/api/auth/auth-request/handle', 'POST', { requestId, shouldAccept });
            if (!response.ok) {
                console.log("Failed to handle request");
                return false;
            }
            return response
        } catch(error) {
            console.error("Error handling request:", error);
            return false;
        }
    }

   
}
