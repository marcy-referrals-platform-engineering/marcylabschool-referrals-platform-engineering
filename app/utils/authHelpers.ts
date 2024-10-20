import { apiFetch } from "./globalUtils";

export const sendAuthorizationRequest = async (email: string, name: string, img: string) => {
    console.log('Request data:', { email, name, img });
    const success =  await apiFetch('/api/auth/request-auth', 'POST', {email,name, img })
    if (!success) return false;
    else return true
  };
  