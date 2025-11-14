import {myblogApi} from "@/api";

import type {ActionFunction} from "react-router";
import {AxiosError} from 'axios'
import type {ActionResponse, AuthResponse} from "@/types";

const signupAction: ActionFunction = async ({request}) => {
    const data = await request.json()
    try {
        const response = await myblogApi.post('/auth/register', data, {
            withCredentials: true,
        });
        const responseData = response.data as AuthResponse;
        console.log(responseData)

        localStorage.setItem('accesToken', responseData.accessToken)
        localStorage.setItem('user', JSON.stringify(responseData.user));

        return {
            ok: true,
            data: responseData,
        } as ActionResponse<AuthResponse>;

    } catch (err) {
        if (err instanceof AxiosError) {
            return {
                ok: false,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                err: err.response?.data
            } as ActionResponse;
        }
        throw err;
    }
}
export default signupAction
