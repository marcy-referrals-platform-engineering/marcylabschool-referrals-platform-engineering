import { apiFetch } from "./globalUtils";

export const sendAuthorizationRequest = async (email: string, name: string, img: string) => {
    const success =  await apiFetch('/api/auth/request-auth', 'POST', {email,name, img })
    if (!success) return false;
    else return true
  };
  