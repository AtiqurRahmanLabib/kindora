import { authClient } from "./auth-client";

export const GetTokenFromClient = async () => {
  const { data } = await authClient.token();
  const token = data?.token;
  return token;
};