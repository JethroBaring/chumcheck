import type * as Kit from '@sveltejs/kit';

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
// @ts-ignore
type MatcherParam<M> = M extends (param : string) => param is infer U ? U extends string ? U : string : string;
type RouteParams = { startup: string };
type RouteId = '/(protected)/mentor/startup/[startup]';
type MaybeWithVoid<T> = {} extends T ? T | void : T;
export type RequiredKeys<T> = { [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K; }[keyof T];
type OutputDataShape<T> = MaybeWithVoid<Omit<App.PageData, RequiredKeys<T>> & Partial<Pick<App.PageData, keyof T & keyof App.PageData>> & Record<string, any>>
type EnsureDefined<T> = T extends null | undefined ? {} : T;
type OptionalUnion<U extends Record<string, any>, A extends keyof U = U extends U ? keyof U : never> = U extends unknown ? { [P in Exclude<A, keyof U>]?: never } & U : never;
export type Snapshot<T = any> = Kit.Snapshot<T>;
type LayoutRouteId = RouteId | "/(protected)/mentor/startup/[startup]/i" | "/(protected)/mentor/startup/[startup]/rb" | "/(protected)/mentor/startup/[startup]/rl" | "/(protected)/mentor/startup/[startup]/rna" | "/(protected)/mentor/startup/[startup]/rns"
type LayoutParams = RouteParams & { startup?: string }
type LayoutServerParentData = Omit<EnsureDefined<import('../../../../$types.js').LayoutServerData>, keyof import('../../$types.js').LayoutServerData> & EnsureDefined<import('../../$types.js').LayoutServerData>;
type LayoutParentData = Omit<EnsureDefined<import('../../../../$types.js').LayoutData>, keyof import('../../$types.js').LayoutData> & EnsureDefined<import('../../$types.js').LayoutData>;

export type EntryGenerator = () => Promise<Array<RouteParams>> | Array<RouteParams>;
export type LayoutServerLoad<OutputData extends OutputDataShape<LayoutServerParentData> = OutputDataShape<LayoutServerParentData>> = Kit.ServerLoad<LayoutParams, LayoutServerParentData, OutputData, LayoutRouteId>;
export type LayoutServerLoadEvent = Parameters<LayoutServerLoad>[0];
export type LayoutServerData = Expand<OptionalUnion<EnsureDefined<Kit.LoadProperties<Awaited<ReturnType<typeof import('./proxy+layout.server.js').load>>>>>>;
export type LayoutData = Expand<Omit<LayoutParentData, keyof LayoutServerData> & EnsureDefined<LayoutServerData>>;
export type RequestEvent = Kit.RequestEvent<RouteParams, RouteId>;