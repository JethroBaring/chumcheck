import type { PageServerLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const load: PageServerLoad = async ({ cookies }) => {
	const response = await fetch(`${PUBLIC_API_URL}/startups/`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${cookies.get('Access')}`
		}
	});

  const data = await response.json()

  if(response.ok) {
    return {
      startups: data.results
    }
  }
};
