import { P as PUBLIC_API_URL } from "../../../../../../../chunks/public.js";
const load = async ({ fetch, cookies, params }) => {
  const response = await fetch(
    `${PUBLIC_API_URL}/startups/${params.startup}/allow-initatives/`,
    {
      method: "get",
      headers: {
        Authorization: `Bearer ${cookies.get("Access")}`
      }
    }
  );
  const data = await response.json();
  if (response.ok) {
    const tasks = await fetch(`${PUBLIC_API_URL}/tasks/tasks/?startup_id=${params.startup}`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${cookies.get("Access")}`
      }
    });
    const tasks_data = await tasks.json();
    if (tasks.ok) {
      const tasks_ids = tasks_data.results.map((d) => d.id);
      try {
        const initiativesResults = await Promise.all(
          tasks_ids.map(async (task) => {
            const response2 = await fetch(
              `${PUBLIC_API_URL}/tasks/initiatives/?task_id=${task}`,
              {
                method: "get",
                headers: {
                  Authorization: `Bearer ${cookies.get("Access")}`
                }
              }
            );
            const data2 = await response2.json();
            if (response2.ok) {
              return data2.results;
            }
          })
        ).then((arrayOfArrays) => {
          return [].concat(...arrayOfArrays);
        });
        return {
          allow: data,
          tasks: tasks_data.results,
          initiatives: initiativesResults,
          access: cookies.get("Access")
        };
      } catch (error) {
        console.log(error);
      }
    }
  }
};
export {
  load
};