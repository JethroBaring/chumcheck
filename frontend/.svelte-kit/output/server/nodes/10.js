import * as server from '../entries/pages/(app)/_page.server.ts.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(app)/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(app)/+page.server.ts";
export const imports = ["_app/immutable/nodes/10.C4PxRcCF.js","_app/immutable/chunks/scheduler.C5Rd-ZIZ.js","_app/immutable/chunks/index.GzWkxjRN.js","_app/immutable/chunks/public.C6Wrg0vX.js","_app/immutable/chunks/Moon.Yu6YKDbJ.js","_app/immutable/chunks/utils.CJpQ-IPa.js","_app/immutable/chunks/bundle-mjs.tFMNAL8v.js","_app/immutable/chunks/mode.BeX9mL50.js","_app/immutable/chunks/stores.C5trPz4Q.js","_app/immutable/chunks/index.NQB3_1Bs.js","_app/immutable/chunks/button.BLb86KRQ.js","_app/immutable/chunks/create.CWXb-gbW.js","_app/immutable/chunks/index.BfW4Bjkg.js","_app/immutable/chunks/index.BKzzR3x8.js","_app/immutable/chunks/card.BGfw9Nof.js"];
export const stylesheets = [];
export const fonts = [];
