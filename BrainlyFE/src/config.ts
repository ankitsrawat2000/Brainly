const LOCALBE_SERVER = "http://localhost:3000";
export const BACKEND_URL = typeof LOCALBE_SERVER === 'undefined' ? process.env.NEXT_PUBLIC_BACKEND_URL : LOCALBE_SERVER;

const LOCALFE_SERVER = "http://localhost:5173";
export const FRONTEND_URL = typeof LOCALFE_SERVER === 'undefined' ? process.env.NEXT_PUBLIC_FRONTEND_URL : LOCALFE_SERVER;