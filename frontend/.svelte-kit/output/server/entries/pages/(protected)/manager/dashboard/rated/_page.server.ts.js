import { P as PUBLIC_API_URL } from "../../../../../../chunks/public.js";
const load = async ({ cookies }) => {
  const response = await fetch(`${PUBLIC_API_URL}/startups/ranking-by-urat/`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.get("Access")}`
    }
  });
  const data = await response.json();
  if (response.ok) {
    const mentor = await fetch(`${PUBLIC_API_URL}/users/?user_type=ME`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${cookies.get("Access")}`
      }
    });
    const mentor_data = await mentor.json();
    return {
      applicants: data,
      mentors: mentor_data.results
    };
  }
};
const actions = {
  default: async ({ request, cookies, fetch: fetch2 }) => {
    const formData = await request.formData();
    const startups = [];
    for (let i = 1; i <= 10; i++) {
      const s_id = parseInt(formData.get(`startup${i}Id`));
      const m_id = parseInt(formData.get(`startup${i}Mentor`));
      if (s_id && m_id) {
        startups.push({
          startup_id: s_id,
          mentor_ids: [m_id]
        });
      }
    }
    try {
      await Promise.all(
        startups.map(async (startup) => {
          await fetch2(`${PUBLIC_API_URL}/startups/${startup.startup_id}/approve-applicant/`, {
            method: "post",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${cookies.get("Access")}`
            }
          });
          await fetch2(`${PUBLIC_API_URL}/startups/${startup.startup_id}/appoint-mentors/`, {
            method: "post",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${cookies.get("Access")}`
            },
            body: JSON.stringify({
              mentor_ids: startup.mentor_ids
            })
          });
        })
      ).then((values) => {
        console.log(values);
      });
    } catch (error) {
      console.log(error);
    }
    console.log(startups);
  }
};
export {
  actions,
  load
};
