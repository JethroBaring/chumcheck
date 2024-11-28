import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ cookies, params, locals }) => {
  if(locals.user.role !== 'Mentor') {
    redirect(302, '/startups')
  }
  return {
    startupId: params.id,
    access: cookies.get('Access')
  }
}