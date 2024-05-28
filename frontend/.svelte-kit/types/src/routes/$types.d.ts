import type * as Kit from '@sveltejs/kit';

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
// @ts-ignore
type MatcherParam<M> = M extends (param : string) => param is infer U ? U extends string ? U : string : string;
type RouteParams = {  };
type RouteId = '/';
type MaybeWithVoid<T> = {} extends T ? T | void : T;
export type RequiredKeys<T> = { [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K; }[keyof T];
type OutputDataShape<T> = MaybeWithVoid<Omit<App.PageData, RequiredKeys<T>> & Partial<Pick<App.PageData, keyof T & keyof App.PageData>> & Record<string, any>>
type EnsureDefined<T> = T extends null | undefined ? {} : T;
type OptionalUnion<U extends Record<string, any>, A extends keyof U = U extends U ? keyof U : never> = U extends unknown ? { [P in Exclude<A, keyof U>]?: never } & U : never;
export type Snapshot<T = any> = Kit.Snapshot<T>;
type LayoutRouteId = RouteId | "/(app)" | "/(app)/startups" | "/(app)/startups/[startup]" | "/(app)/test" | "/(auth)/forgotpassword" | "/(auth)/login" | "/(auth)/logout" | "/(auth)/register" | "/(protected)/manager" | "/(protected)/manager/pending" | "/(protected)/manager/qualified" | "/(protected)/manager/rated" | "/(protected)/mentor" | "/(protected)/mentor/startup/[startup]/i" | "/(protected)/mentor/startup/[startup]/rb" | "/(protected)/mentor/startup/[startup]/rl" | "/(protected)/mentor/startup/[startup]/rna" | "/(protected)/mentor/startup/[startup]/rns" | "/(protected)/user" | "/(protected)/user/startup/[startup]/i" | "/(protected)/user/startup/[startup]/rb" | "/(protected)/user/startup/[startup]/rl" | "/(protected)/user/startup/[startup]/rna" | "/(protected)/user/startup/[startup]/rns" | null
type LayoutParams = RouteParams & { startup?: string }
type LayoutParentData = EnsureDefined<{}>;

export type LayoutServerData = null;
export type LayoutData = Expand<LayoutParentData>;