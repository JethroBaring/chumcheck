import { c as create_ssr_component, v as validate_component } from "../../../../../../../chunks/ssr.js";
import "../../../../../../../chunks/index4.js";
import "chart.js/auto";
import { R as Root, T as Tabs_list, a as Tabs_trigger } from "../../../../../../../chunks/index7.js";
import { R as ReadOnlyRubrics, a as Rubrics } from "../../../../../../../chunks/ReadOnlyRubrics.js";
import { T as Tabs_content } from "../../../../../../../chunks/tabs-content.js";
import { B as Button } from "../../../../../../../chunks/button.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if (data.readiness.length > 0) {
    data.readiness.filter((r) => r.readiness_type === "Technology")[0].readiness_level, data.readiness.filter((r) => r.readiness_type === "Organizational")[0].readiness_level, data.readiness.filter((r) => r.readiness_type === "Market")[0].readiness_level, data.readiness.filter((r) => r.readiness_type === "Regulatory")[0].readiness_level, data.readiness.filter((r) => r.readiness_type === "Acceptance")[0].readiness_level, data.readiness.filter((r) => r.readiness_type === "Investment")[0].readiness_level;
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-12tpo2e_START -->${$$result.title = `<title>Readiness Level</title>`, ""}<!-- HEAD_svelte-12tpo2e_END -->`, ""} <div class="flex items-center" data-svelte-h="svelte-qpxg14"><h1 class="text-lg font-semibold md:text-2xl">Readiness Level</h1></div> <div class="flex flex-1 items-center justify-center">${data.scores.length != 0 ? `<div class="h-full flex-1">${validate_component(Root, "Tabs.Root").$$render($$result, { value: "chart", class: "h-full" }, {}, {
    default: () => {
      return `<div class="flex items-center">${validate_component(Tabs_list, "Tabs.List").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Tabs_trigger, "Tabs.Trigger").$$render($$result, { value: "chart" }, {}, {
            default: () => {
              return `Chart`;
            }
          })} ${validate_component(Tabs_trigger, "Tabs.Trigger").$$render($$result, { value: "detailed" }, {}, {
            default: () => {
              return `Detailed`;
            }
          })}`;
        }
      })}</div> ${validate_component(Tabs_content, "Tabs.Content").$$render($$result, { value: "chart", class: "h-[700px]" }, {}, {
        default: () => {
          return `<canvas id="chart"></canvas>`;
        }
      })} ${validate_component(Tabs_content, "Tabs.Content").$$render($$result, { value: "detailed" }, {}, {
        default: () => {
          return `${validate_component(Root, "Tabs.Root").$$render($$result, { value: "technology", class: "h-full" }, {}, {
            default: () => {
              return `<div class="flex items-center">${validate_component(Tabs_list, "Tabs.List").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(Tabs_trigger, "Tabs.Trigger").$$render($$result, { value: "technology" }, {}, {
                    default: () => {
                      return `Technology`;
                    }
                  })} ${validate_component(Tabs_trigger, "Tabs.Trigger").$$render($$result, { value: "market" }, {}, {
                    default: () => {
                      return `Market`;
                    }
                  })} ${validate_component(Tabs_trigger, "Tabs.Trigger").$$render($$result, { value: "organizational" }, {}, {
                    default: () => {
                      return `Organizational`;
                    }
                  })} ${validate_component(Tabs_trigger, "Tabs.Trigger").$$render($$result, { value: "acceptance" }, {}, {
                    default: () => {
                      return `Acceptance`;
                    }
                  })} ${validate_component(Tabs_trigger, "Tabs.Trigger").$$render($$result, { value: "regulatory" }, {}, {
                    default: () => {
                      return `Regulatory`;
                    }
                  })} ${validate_component(Tabs_trigger, "Tabs.Trigger").$$render($$result, { value: "investment" }, {}, {
                    default: () => {
                      return `Investment`;
                    }
                  })}`;
                }
              })}</div> <div class="overflow-scroll h-full">${validate_component(ReadOnlyRubrics, "ReadOnlyRubrics").$$render(
                $$result,
                {
                  questions: data.questions.filter((q) => q.readiness_type === "Technology"),
                  scores: data.scores.filter((score) => score.readiness_type === "Technology"),
                  readiness_level: data.readiness.filter((r) => r.readiness_type === "Technology")[0],
                  type: "technology"
                },
                {},
                {}
              )} ${validate_component(ReadOnlyRubrics, "ReadOnlyRubrics").$$render(
                $$result,
                {
                  questions: data.questions.filter((q) => q.readiness_type === "Market"),
                  scores: data.scores.filter((score) => score.readiness_type === "Market"),
                  readiness_level: data.readiness.filter((r) => r.readiness_type === "Market")[0],
                  type: "market"
                },
                {},
                {}
              )} ${validate_component(ReadOnlyRubrics, "ReadOnlyRubrics").$$render(
                $$result,
                {
                  questions: data.questions.filter((q) => q.readiness_type === "Acceptance"),
                  scores: data.scores.filter((score) => score.readiness_type === "Acceptance"),
                  readiness_level: data.readiness.filter((r) => r.readiness_type === "Acceptance")[0],
                  type: "acceptance"
                },
                {},
                {}
              )} ${validate_component(ReadOnlyRubrics, "ReadOnlyRubrics").$$render(
                $$result,
                {
                  questions: data.questions.filter((q) => q.readiness_type === "Organizational"),
                  scores: data.scores.filter((score) => score.readiness_type === "Organizational"),
                  readiness_level: data.readiness.filter((r) => r.readiness_type === "Organizational")[0],
                  type: "organizational"
                },
                {},
                {}
              )} ${validate_component(ReadOnlyRubrics, "ReadOnlyRubrics").$$render(
                $$result,
                {
                  questions: data.questions.filter((q) => q.readiness_type === "Regulatory"),
                  scores: data.scores.filter((score) => score.readiness_type === "Regulatory"),
                  readiness_level: data.readiness.filter((r) => r.readiness_type === "Regulatory")[0],
                  type: "regulatory"
                },
                {},
                {}
              )} ${validate_component(ReadOnlyRubrics, "ReadOnlyRubrics").$$render(
                $$result,
                {
                  questions: data.questions.filter((q) => q.readiness_type === "Investment"),
                  scores: data.scores.filter((score) => score.readiness_type === "Investment"),
                  readiness_level: data.readiness.filter((r) => r.readiness_type === "Investment")[0],
                  type: "investment"
                },
                {},
                {}
              )}</div>`;
            }
          })}`;
        }
      })}`;
    }
  })}</div>` : `<div class="h-full flex-1">${validate_component(Root, "Tabs.Root").$$render($$result, { value: "technology", class: "h-full" }, {}, {
    default: () => {
      return `<div class="flex items-center">${validate_component(Tabs_list, "Tabs.List").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Tabs_trigger, "Tabs.Trigger").$$render($$result, { value: "technology" }, {}, {
            default: () => {
              return `Technology`;
            }
          })} ${validate_component(Tabs_trigger, "Tabs.Trigger").$$render($$result, { value: "market" }, {}, {
            default: () => {
              return `Market`;
            }
          })} ${validate_component(Tabs_trigger, "Tabs.Trigger").$$render($$result, { value: "organizational" }, {}, {
            default: () => {
              return `Organizational`;
            }
          })} ${validate_component(Tabs_trigger, "Tabs.Trigger").$$render($$result, { value: "acceptance" }, {}, {
            default: () => {
              return `Acceptance`;
            }
          })} ${validate_component(Tabs_trigger, "Tabs.Trigger").$$render($$result, { value: "regulatory" }, {}, {
            default: () => {
              return `Regulatory`;
            }
          })} ${validate_component(Tabs_trigger, "Tabs.Trigger").$$render($$result, { value: "investment" }, {}, {
            default: () => {
              return `Investment`;
            }
          })}`;
        }
      })}</div> <div class="overflow-scroll h-full"><form method="post" class="h-0">${validate_component(Rubrics, "Rubrics").$$render(
        $$result,
        {
          questions: data.questions.filter((q) => q.readiness_type === "Technology"),
          type: "technology"
        },
        {},
        {}
      )} ${validate_component(Rubrics, "Rubrics").$$render(
        $$result,
        {
          questions: data.questions.filter((q) => q.readiness_type === "Market"),
          type: "market"
        },
        {},
        {}
      )} ${validate_component(Rubrics, "Rubrics").$$render(
        $$result,
        {
          questions: data.questions.filter((q) => q.readiness_type === "Acceptance"),
          type: "acceptance"
        },
        {},
        {}
      )} ${validate_component(Rubrics, "Rubrics").$$render(
        $$result,
        {
          questions: data.questions.filter((q) => q.readiness_type === "Organizational"),
          type: "organizational"
        },
        {},
        {}
      )} ${validate_component(Rubrics, "Rubrics").$$render(
        $$result,
        {
          questions: data.questions.filter((q) => q.readiness_type === "Regulatory"),
          type: "regulatory"
        },
        {},
        {}
      )} ${validate_component(Rubrics, "Rubrics").$$render(
        $$result,
        {
          questions: data.questions.filter((q) => q.readiness_type === "Investment"),
          type: "investment"
        },
        {},
        {}
      )} ${validate_component(Button, "Button").$$render($$result, { type: "submit", class: "mt-3" }, {}, {
        default: () => {
          return `Submit`;
        }
      })}</form></div>`;
    }
  })}</div>`}</div>`;
});
export {
  Page as default
};
