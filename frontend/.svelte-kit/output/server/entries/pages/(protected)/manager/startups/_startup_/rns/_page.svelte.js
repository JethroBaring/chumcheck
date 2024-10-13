import { c as create_ssr_component, v as validate_component, d as each, e as escape, a as add_attribute } from "../../../../../../../chunks/ssr.js";
import { P as Plus } from "../../../../../../../chunks/plus.js";
import "../../../../../../../chunks/client.js";
import "../../../../../../../chunks/index11.js";
import { R as Root, D as Dialog_content } from "../../../../../../../chunks/index8.js";
import "../../../../../../../chunks/index4.js";
import "clsx";
import { B as Badge } from "../../../../../../../chunks/badge.js";
import { T as Target } from "../../../../../../../chunks/target.js";
import { T as Textarea } from "../../../../../../../chunks/textarea.js";
import { L as Label } from "../../../../../../../chunks/label.js";
import { B as Button } from "../../../../../../../chunks/button.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  function toggleOpen() {
    open = !open;
  }
  let { data } = $$props;
  data.access;
  console.log(data.technology);
  let tasks = data.tasks;
  let items = [
    {
      title: "Backlog",
      items: [
        {
          subTitle: "Scheduled",
          subStatus: 4,
          subItems: tasks.filter((t) => t.status === 4)
        }
      ]
    },
    {
      title: "In Progress",
      items: [
        {
          subTitle: "Track",
          subStatus: 5,
          subItems: tasks.filter((t) => t.status === 5)
        },
        {
          subTitle: "Delayed",
          subStatus: 3,
          subItems: tasks.filter((t) => t.status === 3)
        }
      ]
    },
    {
      title: "Done",
      items: [
        {
          subTitle: "Completed",
          subStatus: 6,
          subItems: tasks.filter((t) => t.status === 6)
        },
        {
          subTitle: "Discontinued",
          subStatus: 2,
          subItems: tasks.filter((t) => t.status === 2)
        }
      ]
    }
  ];
  let open = false;
  let updateOpen = false;
  function toggleUpdateOpen() {
    updateOpen = !updateOpen;
  }
  let currItem = items[0].items[0].subItems[0];
  let currUpdateItem = tasks[0];
  console.log(tasks);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-1165yh7_START -->${$$result.title = `<title>Recommended Next Steps</title>`, ""}<!-- HEAD_svelte-1165yh7_END -->`, ""} <div class="flex items-center"><div class="flex w-full justify-between"><h1 class="text-lg font-semibold md:text-2xl" data-svelte-h="svelte-zkwb6f">Recommended Next Steps</h1> ${data.allow && tasks.length === 0 ? `<div class="flex gap-3"> ${validate_component(Button, "Button").$$render($$result, { disabled: !data.allow }, {}, {
      default: () => {
        return `Generate RNS`;
      }
    })}</div>` : `${tasks.length > 0 && tasks[0].status === 1 ? `${validate_component(Button, "Button").$$render($$result, {}, {}, {
      default: () => {
        return `Save`;
      }
    })}` : ``}`}</div></div> <div class="flex flex-1 gap-6">${tasks.length > 0 && tasks[0].status !== 1 ? `${each(items, (item, index) => {
      return `<div class="flex flex-1 flex-col gap-1"><p class="text-[17px] font-medium">${escape(item.title)}</p> <div class="bg-muted dark:bg-muted/40 flex flex-1 flex-col gap-6 overflow-scroll rounded-lg p-4"><div class="flex h-0 flex-col gap-6">${each(item.items, (subItem, subIndex) => {
        return `<div class="flex flex-col gap-3"><div class="flex items-center gap-3"><p>${escape(subItem.subTitle)}</p> <button>${validate_component(Plus, "Plus").$$render($$result, { class: "h-4 w-4" }, {}, {})} </button></div> <div class="flex flex-col gap-4">${subItem.subItems.length === 0 ? `<div class="h-40"></div>` : `${each(subItem.subItems, (item2, i) => {
          return `<div class="dark:bg-muted flex h-40 cursor-pointer flex-col gap-3 rounded-lg bg-white/60 p-5"><p>${escape(item2.description.substring(0, 80) + "...")}</p> ${validate_component(Badge, "Badge").$$render($$result, { class: "w-fit" }, {}, {
            default: () => {
              return `${escape(item2.readiness_type_rl_type)}`;
            }
          })} <div class="flex items-center gap-1">${validate_component(Target, "Target").$$render($$result, { class: "h-4 w-4" }, {}, {})} <p class="text-sm">Target Level:

														${escape(item2.target_level_level)} </p></div> </div>`;
        })}`}</div> </div>`;
      })} </div></div> </div>`;
    })}` : `${tasks.length > 0 ? `<div class="mx-auto flex h-fit w-2/3 gap-6"><div class="flex flex-1 flex-col gap-2"><p class="text-[17px] font-medium" data-svelte-h="svelte-rw2xfq">Short Term</p> <div class="bg-muted dark:bg-muted/40 flex flex-1 flex-col gap-6 rounded-lg p-4">${each(tasks.filter((task) => task.task_type === 1), (task, index) => {
      return `  <div class="dark:bg-muted flex h-40 cursor-pointer flex-col gap-3 rounded-lg bg-white/60 p-5"><p>${escape(task.description.substring(0, 80) + "...")}</p> ${validate_component(Badge, "Badge").$$render($$result, { class: "w-fit" }, {}, {
        default: () => {
          return `${escape(task.readiness_type_rl_type)}`;
        }
      })} <div class="flex items-center gap-1">${validate_component(Target, "Target").$$render($$result, { class: "h-4 w-4" }, {}, {})} <p class="text-sm">Target Level: ${escape(task.target_level_level)}</p></div> </div>`;
    })}</div></div> <div class="flex flex-1 flex-col gap-2"><p class="text-[17px] font-medium" data-svelte-h="svelte-1yosdc6">Long Term</p> <div class="bg-muted dark:bg-muted/40 flex flex-1 flex-col gap-6 rounded-lg p-4">${each(tasks.filter((task) => task.task_type === 2), (task, index) => {
      return `  <div class="dark:bg-muted flex h-40 cursor-pointer flex-col gap-3 rounded-lg bg-white/60 p-5"><p>${escape(task.description.substring(0, 80) + "...")}</p> ${validate_component(Badge, "Badge").$$render($$result, { class: "w-fit" }, {}, {
        default: () => {
          return `${escape(task.readiness_type_rl_type)}`;
        }
      })} <div class="flex items-center gap-1">${validate_component(Target, "Target").$$render($$result, { class: "h-4 w-4" }, {}, {})} <p class="text-sm">Target Level: ${escape(task.target_level_level)}</p></div> </div>`;
    })}</div></div></div>` : `${`${data.allow ? `<div class="flex flex-1 items-center justify-center" data-svelte-h="svelte-x0irl7"><h1>Generate Recommended Next Steps by clicking the button</h1></div>` : `<div class="flex flex-1 items-center justify-center" data-svelte-h="svelte-1e1fth5"><h1>Finish the Readiness and Needs Assessment first to be able to generate Recommended Next
				Steps for startup</h1></div>`}`}`}`}</div> ${validate_component(Root, "Dialog.Root").$$render($$result, { open, onOpenChange: toggleOpen }, {}, {
      default: () => {
        return `${validate_component(Dialog_content, "Dialog.Content").$$render($$result, { class: "h-[450px] max-w-[800px]" }, {}, {
          default: () => {
            return `<div class="grid h-[250px] w-full gap-1.5">${validate_component(Label, "Label").$$render($$result, {}, {}, {
              default: () => {
                return `Description`;
              }
            })} ${validate_component(Textarea, "Textarea").$$render(
              $$result,
              {
                rows: 20,
                class: "text-lg",
                value: currItem.description
              },
              {
                value: ($$value) => {
                  currItem.description = $$value;
                  $$settled = false;
                }
              },
              {}
            )}</div> ${validate_component(Badge, "Badge").$$render($$result, { class: "h-fit w-fit" }, {}, {
              default: () => {
                return `Technology`;
              }
            })} <div class="flex items-center gap-1">${validate_component(Target, "Target").$$render($$result, { class: "h-4 w-4" }, {}, {})} <p class="text-sm">Target Level: <select>${currItem.readiness_type_rl_type === "Technology" ? `${each(data.technology, (level) => {
              return `<option${add_attribute("value", level.id, 0)} ${currItem.target_level_level === level.level ? "selected" : ""}>${escape(level.level)}</option>`;
            })}` : `${currItem.readiness_type_rl_type === "Market" ? `${each(data.market, (level) => {
              return `<option${add_attribute("value", level.id, 0)} ${currItem.target_level_level === level.level ? "selected" : ""}>${escape(level.level)}</option>`;
            })}` : `${currItem.readiness_type_rl_type === "Organizational" ? `${each(data.organizational, (level) => {
              return `<option${add_attribute("value", level.id, 0)} ${currItem.target_level_level === level.level ? "selected" : ""}>${escape(level.level)}</option>`;
            })}` : `${currItem.readiness_type_rl_type === "Regulatory" ? `${each(data.regulatory, (level) => {
              return `<option${add_attribute("value", level.id, 0)} ${currItem.target_level_level === level.level ? "selected" : ""}>${escape(level.level)}</option>`;
            })}` : `${currItem.readiness_type_rl_type === "Acceptance" ? `${each(data.acceptance, (level) => {
              return `<option${add_attribute("value", level.id, 0)} ${currItem.target_level_level === level.level ? "selected" : ""}>${escape(level.level)}</option>`;
            })}` : `${currItem.readiness_type_rl_type === "Investment" ? `${each(data.investment, (level) => {
              return `<option${add_attribute("value", level.id, 0)} ${currItem.target_level_level === level.level ? "selected" : ""}>${escape(level.level)}</option>`;
            })}` : ``}`}`}`}`}`}</select></p></div> <div class="flex justify-end">${validate_component(Button, "Button").$$render($$result, {}, {}, {
              default: () => {
                return `Save`;
              }
            })}</div>`;
          }
        })}`;
      }
    })} ${validate_component(Root, "Dialog.Root").$$render(
      $$result,
      {
        open: updateOpen,
        onOpenChange: toggleUpdateOpen
      },
      {},
      {
        default: () => {
          return `${validate_component(Dialog_content, "Dialog.Content").$$render($$result, { class: "h-[450px] max-w-[800px]" }, {}, {
            default: () => {
              return `<div class="grid h-[250px] w-full gap-1.5">${validate_component(Label, "Label").$$render($$result, {}, {}, {
                default: () => {
                  return `Description`;
                }
              })} ${validate_component(Textarea, "Textarea").$$render(
                $$result,
                {
                  rows: 20,
                  class: "text-lg",
                  value: currUpdateItem.description
                },
                {
                  value: ($$value) => {
                    currUpdateItem.description = $$value;
                    $$settled = false;
                  }
                },
                {}
              )}</div> ${validate_component(Badge, "Badge").$$render($$result, { class: "h-fit w-fit" }, {}, {
                default: () => {
                  return `Technology`;
                }
              })} <div class="flex items-center gap-1">${validate_component(Target, "Target").$$render($$result, { class: "h-4 w-4" }, {}, {})} <p class="text-sm">Target Level: <select>${currUpdateItem.readiness_type_rl_type === "Technology" ? `${each(data.technology, (level) => {
                return `<option${add_attribute("value", level.id, 0)} ${currUpdateItem.target_level_level === level.level ? "selected" : ""}>${escape(level.level)}</option>`;
              })}` : `${currUpdateItem.readiness_type_rl_type === "Market" ? `${each(data.market, (level) => {
                return `<option${add_attribute("value", level.id, 0)} ${currUpdateItem.target_level_level === level.level ? "selected" : ""}>${escape(level.level)}</option>`;
              })}` : `${currUpdateItem.readiness_type_rl_type === "Organizational" ? `${each(data.organizational, (level) => {
                return `<option${add_attribute("value", level.id, 0)} ${currUpdateItem.target_level_level === level.level ? "selected" : ""}>${escape(level.level)}</option>`;
              })}` : `${currUpdateItem.readiness_type_rl_type === "Regulatory" ? `${each(data.regulatory, (level) => {
                return `<option${add_attribute("value", level.id, 0)} ${currUpdateItem.target_level_level === level.level ? "selected" : ""}>${escape(level.level)}</option>`;
              })}` : `${currUpdateItem.readiness_type_rl_type === "Acceptance" ? `${each(data.acceptance, (level) => {
                return `<option${add_attribute("value", level.id, 0)} ${currUpdateItem.target_level_level === level.level ? "selected" : ""}>${escape(level.level)}</option>`;
              })}` : `${currUpdateItem.readiness_type_rl_type === "Investment" ? `${each(data.investment, (level) => {
                return `<option${add_attribute("value", level.id, 0)} ${currUpdateItem.target_level_level === level.level ? "selected" : ""}>${escape(level.level)}</option>`;
              })}` : ``}`}`}`}`}`}</select></p></div> <div class="flex justify-end">${validate_component(Button, "Button").$$render($$result, {}, {}, {
                default: () => {
                  return `Save`;
                }
              })}</div>`;
            }
          })}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
