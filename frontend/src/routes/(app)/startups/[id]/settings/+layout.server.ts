import type { LayoutServerLoad } from "../$types";

export const load: LayoutServerLoad = ({ cookies, locals, params}) => {
  return {
    startupId: params.id,
    access: cookies.get('Access'),
    user: locals.user
  }
}