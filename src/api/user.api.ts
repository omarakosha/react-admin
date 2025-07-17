import type { LoginParams, LoginResult, LogoutParams, LogoutResult } from '../interface/user/login';

import { request } from './request';

/** واجهة تسجيل الدخول */
export const apiLogin = (data: LoginParams) => request<LoginResult>('post', '/user/login', data);

/** واجهة تسجيل الخروج */
export const apiLogout = (data: LogoutParams) => request<LogoutResult>('post', '/user/logout', data);
