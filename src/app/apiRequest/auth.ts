import { AccountResType } from "../schemaValidations/account.chema";
import { LoginBodyType, LoginResType, RegisterBodyType, RegisterResType, RoleResType } from "../schemaValidations/auth.schema";
import http from "../untils/http";

const authApiRequest={
    auth: (body: {sessionToken: string, username: string, userId: number})=> http.post('/api/auth', body,{
        baseUrl: ''
    }),
    register: (body: RegisterBodyType) => http.post<RegisterResType>('/user/register',body),
    login: (body: LoginBodyType) => http.post<LoginResType>('/user/login',body),
    roleid: (username: string,sessionToken: string) => http.get<RoleResType>(`/user/getroleid/byusername/${username}`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`
      }
    }) ,
    roleIdClient:(username: string) => http.get<RoleResType>(`/user/getroleid/byusername/${username}`) ,

    getAccountByRoleId: (roleId: number, sessionToken: string) =>
      http.get<AccountResType>(`user/by-role/${roleId}`,{
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      }),
    updateIsActive: (username: string, isActive: boolean, sessionToken: string) =>
      http.put<AccountResType>(`/user/update/is-active?username=${username}&isActive=${isActive}`,{
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      }),
}
export default authApiRequest