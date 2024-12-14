import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ cookies, params, locals }) => {
  if(locals.user.role === 'Manager' || locals.user.role === 'Startup') {
    redirect(302, '/startups')
  }
  return {
    startupId: params.id,
    access: cookies.get('Access')
  }
}