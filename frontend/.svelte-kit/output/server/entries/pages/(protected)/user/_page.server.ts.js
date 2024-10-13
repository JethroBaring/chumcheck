import { r as redirect } from "../../../../chunks/index.js";
import { P as PUBLIC_API_URL } from "../../../../chunks/public.js";
const load = async ({ url, fetch, cookies }) => {
  const showToast = url.searchParams.get("toast") === "true";
  const response = await fetch(`${PUBLIC_API_URL}/startups/`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${cookies.get("Access")}`
    }
  });
  const data = await response.json();
  if (response.ok) {
    return {
      showToast,
      startups: data.results
    };
  }
};
const actions = {
  default: async ({ request, fetch, locals, cookies }) => {
    const formData = await request.formData();
    const newFormData = new FormData();
    newFormData.append("data_privacy", formData.get("data_privacy"));
    newFormData.append("eligibility", formData.get("eligibility"));
    newFormData.append("name", formData.get("startup_name"));
    newFormData.append("user_id", locals.user.id.toString());
    newFormData.append("capsule_proposal", formData.get("capsule_proposal"));
    newFormData.append("links", formData.get("links"));
    newFormData.append("group_name", formData.get("group_name"));
    newFormData.append("university_name", formData.get("university_name"));
    for (let i = 2; i < 5; i++) {
      if (formData.get(`member_${i}`) !== null) {
        newFormData.append("set_members", formData.get(`member_${i}`));
      }
    }
    const response = await fetch(`${PUBLIC_API_URL}/startups/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookies.get("Access")}`
      },
      body: newFormData
    });
    const data = await response.json();
    if (response.ok) {
      const startupId = data.id;
      const types = [
        "technology",
        "market",
        "acceptance",
        "organizational",
        "regulatory",
        "investment"
      ];
      const categories = [
        "Technology",
        "Product Development",
        "Product Definition/Design",
        "Competitive Landscape",
        "Team",
        "Go-To-Market",
        "Manufacturing/Supply Chain"
      ];
      const answers = [];
      const calculatorAnswers = [];
      types.forEach((type) => {
        for (let i = 0; i < 3; i++) {
          answers.push({
            startup_id: startupId,
            urat_question_id: Number.parseInt(formData.get(`${type}${i}id`)),
            response: formData.get(`${type}${i}`),
            score: 1
          });
        }
      });
      categories.forEach((category) => {
        calculatorAnswers.push({
          startup_id: startupId,
          calculator_question_id: parseInt(formData.get(`${category}`))
        });
      });
      const urat_answers = await fetch(`${PUBLIC_API_URL}/urat-question-answers/bulk-create/`, {
        method: "post",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${cookies.get("Access")}`
        },
        body: JSON.stringify({
          urat_question_answers: answers
        })
      });
      const calculator_answers = await fetch(
        `${PUBLIC_API_URL}/calculator-question-answers/bulk-create/`,
        {
          method: "post",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${cookies.get("Access")}`
          },
          body: JSON.stringify({
            calculator_question_answers: calculatorAnswers
          })
        }
      );
      if (urat_answers.ok && calculator_answers.ok) {
        const capsule_info = await fetch(`${PUBLIC_API_URL}/capsule-proposal-infos/`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${cookies.get("Access")}`
          },
          body: JSON.stringify({
            title: formData.get("title"),
            startup_description: formData.get("startupDescription"),
            problem_statement: formData.get("problemStatement"),
            target_market: formData.get("targetMarket"),
            solution_description: formData.get("solutionDescription"),
            objectives: formData.get("objectives"),
            scope: formData.get("scope"),
            methodology: formData.get("methodology"),
            startup_id: startupId
          })
        });
        if (capsule_info.ok) {
          redirect(302, "/user?toast=true");
        }
      }
    }
  }
};
export {
  actions,
  load
};
