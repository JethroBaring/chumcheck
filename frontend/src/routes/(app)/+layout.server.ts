// import { redirect } from "@sveltejs/kit";
// import type { LayoutServerLoad } from "./$types";

// export const load: LayoutServerLoad = async ({ url, locals, params }) => {
//   if(!locals.user) {
//     redirect(302, '/');
//   }
  
//   return {
//     startup: params.id,
//     user: locals.user,
//     currentModule: url.pathname.slice(1)
//   };
// };