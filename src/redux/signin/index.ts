import { createApi } from "@reduxjs/toolkit/query/react";
import {
	ACCESS_TOKEN,
	http,
	setStoreJson,
	USER_INFO,
} from "../../utils/setting";
import { setUserInfo } from "./account";
import { DataLogin, LoginType } from "./types";

export const signInApi = createApi({
	baseQuery: http,
	reducerPath: "signInApi",
	endpoints: (builder) => ({
		login: builder.mutation<LoginType, DataLogin>({
			query: (data) => {
				return {
					url: "/auth/signin",
					method: "post",
					data: {
						email: data.username,
						password: data.password,
					},
				};
			},
			transformResponse: (res) => {
				const accessToken = res.content.token;
				const userInfo = res.content.user;
				setStoreJson(USER_INFO, userInfo);
				setStoreJson(ACCESS_TOKEN, accessToken);
				return res;
			},
		}),
		register: builder.mutation<any, any>({
			query: (payload) => {
				return {
					url: '/auth/signup',
					method: 'post',
					data: payload?.data
				}
			}
		})
	}),
});

export const { useLoginMutation, useRegisterMutation } = signInApi;
