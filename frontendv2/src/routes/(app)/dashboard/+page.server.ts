import { fetchWithAuth } from "$lib/utils";
import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = async ({ cookies, fetch}) => {
  try {
		const [rankingUratResponse, mentorResponse, rankingRubricsResponse, rankingUratResponseLog] = await Promise.all([
      fetchWithAuth('/startups/ranking-by-urat/',cookies, fetch),
      fetchWithAuth('/users/?user_type=ME', cookies, fetch),
      fetchWithAuth('/startups/ranking-by-rubrics/', cookies, fetch),
      fetchWithAuth('/startups/ranking-by-urat/', cookies, fetch)
		]);

		const rankingUratData = await rankingUratResponse.json();
		const mentorData = await mentorResponse.json();
		const rankingRubricsData = await rankingRubricsResponse.json();
		const rankingUratLogData = await rankingUratResponseLog.json();

		if (
			rankingUratResponse.ok &&
			mentorResponse.ok &&
			rankingRubricsResponse.ok &&
			rankingUratResponseLog.ok
		) {
			console.log(rankingUratLogData); 
			return {
				applicants: rankingUratData,
				mentors: mentorData.results,
				rubricsApplicants: rankingRubricsData,
				access: cookies.get('Access')
			};
		} else {
			console.error('Error fetching data', {
				uratStatus: rankingUratResponse.status,
				mentorStatus: mentorResponse.status,
				rubricsStatus: rankingRubricsResponse.status,
				uratLogStatus: rankingUratResponseLog.status
			});
		}
	} catch (error) {
		console.error('Error during load:', error);
		return {
			applicants: [],
			mentors: [],
			rubricsApplicants: [],
			access: cookies.get('Access')
		};
	}
}