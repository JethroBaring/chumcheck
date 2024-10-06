import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ url, locals }) => {
  return {
    user: locals.user,
    currentModule: url.pathname.slice(1)
  };
};