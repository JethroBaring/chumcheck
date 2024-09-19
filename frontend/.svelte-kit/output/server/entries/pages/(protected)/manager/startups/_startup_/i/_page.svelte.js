import { c as create_ssr_component, v as validate_component, d as each, e as escape } from "../../../../../../../chunks/ssr.js";
import { P as Plus } from "../../../../../../../chunks/plus.js";
import "../../../../../../../chunks/client.js";
import "../../../../../../../chunks/index11.js";
import { R as Root$1, D as Dialog_content } from "../../../../../../../chunks/index8.js";
import "../../../../../../../chunks/index4.js";
import "clsx";
import { B as Badge } from "../../../../../../../chunks/badge.js";
import "dequal";
import "../../../../../../../chunks/create.js";
import { R as Root, T as Tabs_list, a as Tabs_trigger } from "../../../../../../../chunks/index7.js";
import { T as Textarea } from "../../../../../../../chunks/textarea.js";
import { B as Button } from "../../../../../../../chunks/button.js";
import { T as Tabs_content } from "../../../../../../../chunks/tabs-content.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  function toggleOpen() {
    open = !open;
  }
  let { data } = $$props;
  data.access;
  let initiatives = data.initiatives;
  let items = [
    {
      title: "Backlog",
      items: [
        {
          subTitle: "Scheduled",
          subStatus: 4,
          subItems: initiatives.filter((t) => t.status === 4)
        }
      ]
    },
    {
      title: "In Progress",
      items: [
        {
          subTitle: "Track",
          subStatus: 5,
          subItems: initiatives.filter((t) => t.status === 5)
        },
        {
          subTitle: "Delayed",
          subStatus: 3,
          subItems: initiatives.filter((t) => t.status === 3)
        }
      ]
    },
    {
      title: "Done",
      items: [
        {
          subTitle: "Completed",
          subStatus: 6,
          subItems: initiatives.filter((t) => t.status === 6)
        },
        {
          subTitle: "Discontinued",
          subStatus: 2,
          subItems: initiatives.filter((t) => t.status === 2)
        }
      ]
    }
  ];
  let open = false;
  let currItem = items[0].items[0].subItems[0];
  let updateOpen = false;
  function toggleUpdateOpen() {
    updateOpen = !updateOpen;
  }
  let currUpdateItem = initiatives[0];
  const shortTerm = data.tasks.filter((d) => d.task_type === 1);
  const longTerm = data.tasks.filter((d) => d.task_type === 2);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-ydu9nt_START -->${$$result.title = `<title>Initiatives</title>`, ""}<!-- HEAD_svelte-ydu9nt_END -->`, ""} <div class="flex items-center"><div class="flex w-full justify-between"><h1 class="text-lg font-semibold md:text-2xl" data-svelte-h="svelte-meidzv">Initiatives</h1> ${data.allow && initiatives.length === 0 ? `<div class="flex gap-3"> ${validate_component(Button, "Button").$$render($$result, { disabled: !data.allow }, {}, {
      default: () => {
        return `Generate Initiatives`;
      }
    })}</div>` : `${initiatives.length > 0 && initiatives[0].status === 1 ? `${validate_component(Button, "Button").$$render($$result, {}, {}, {
      default: () => {
        return `Save`;
      }
    })}` : ``}`}</div></div> <div class="flex flex-1 gap-6">${initiatives.length > 0 && initiatives[0].status !== 1 ? `${each(items, (item, index) => {
      return `<div class="flex flex-1 flex-col gap-1"><p class="text-[17px] font-medium">${escape(item.title)}</p> <div class="flex flex-1 flex-col gap-6 rounded-lg bg-muted p-4 dark:bg-muted/40 overflow-scroll"><div class="h-0 flex flex-col gap-6 ">${each(item.items, (subItem, subIndex) => {
        return `<div class="flex flex-col gap-3"><div class="flex items-center gap-3"><p>${escape(subItem.subTitle)}</p> <button>${validate_component(Plus, "Plus").$$render($$result, { class: "h-4 w-4" }, {}, {})} </button></div> <div class="flex flex-col gap-4">${subItem.subItems.length === 0 ? `<div class="h-40"></div>` : `${each(subItem.subItems, (item2, i) => {
          return `<div class="flex h-40 cursor-pointer flex-col gap-3 rounded-lg bg-white/60 p-5 dark:bg-muted"><p>${escape(item2.description.substring(0, 80) + "...")}</p> </div>`;
        })}`}</div> </div>`;
      })} </div></div> </div>`;
    })}` : `${initiatives.length > 0 ? `<div class="mx-auto flex h-fit w-full gap-6"><div class="flex flex-1 flex-col gap-2">${validate_component(Root, "Tabs.Root").$$render($$result, { value: "short", class: "" }, {}, {
      default: () => {
        return `<div class="flex items-center">${validate_component(Tabs_list, "Tabs.List").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Tabs_trigger, "Tabs.Trigger").$$render($$result, { value: "short" }, {}, {
              default: () => {
                return `Short Term`;
              }
            })} ${validate_component(Tabs_trigger, "Tabs.Trigger").$$render($$result, { value: "long" }, {}, {
              default: () => {
                return `Long Term`;
              }
            })}`;
          }
        })}</div> ${validate_component(Tabs_content, "Tabs.Content").$$render($$result, { value: "short" }, {}, {
          default: () => {
            return `<div class="flex gap-3">${each(shortTerm, (term) => {
              return `<div class="flex flex-1 flex-col gap-6 rounded-lg bg-muted p-4 dark:bg-muted/40"><h1 class="font-semibold text-base">Priority ${escape(term.priority_number)} Initiatives</h1> ${each(initiatives.filter((init) => init.task_id === term.id), (task, index) => {
                return `  <div class="flex h-40 cursor-pointer flex-col gap-3 rounded-lg bg-white/60 p-5 dark:bg-muted"><p>${escape(task.description.substring(0, 80) + "...")}</p> ${validate_component(Badge, "Badge").$$render($$result, { class: "w-fit" }, {}, {
                  default: () => {
                    return `Initiative # ${escape(index + 1)}`;
                  }
                })} </div>`;
              })} </div>`;
            })}</div>`;
          }
        })} ${validate_component(Tabs_content, "Tabs.Content").$$render($$result, { value: "long" }, {}, {
          default: () => {
            return `<div class="flex gap-3">${each(longTerm, (term) => {
              return `<div class="flex flex-1 flex-col gap-6 rounded-lg bg-muted p-4 dark:bg-muted/40"><h1 class="font-semibold text-base">Priority ${escape(term.priority_number)} Initiatives</h1> ${each(initiatives.filter((init) => init.task_id === term.id), (task) => {
                return `  <div class="flex h-40 cursor-pointer flex-col gap-3 rounded-lg bg-white/60 p-5 dark:bg-muted"><p>${escape(task.description.substring(0, 80) + "...")}</p> ${validate_component(Badge, "Badge").$$render($$result, { class: "w-fit" }, {}, {
                  default: () => {
                    return `Priority #1 Initiative #1`;
                  }
                })} </div>`;
              })} </div>`;
            })}</div>`;
          }
        })}`;
      }
    })}</div></div>` : `${`${data.allow ? `<div class="flex flex-1 items-center justify-center" data-svelte-h="svelte-mlealf"><h1>Generate Initiatives by clicking the button</h1></div>` : `<div class="flex flex-1 items-center justify-center" data-svelte-h="svelte-ctpx4t"><h1>Finish the Recommended Next Steps first to be able to generate Initiatives for startup</h1></div>`}`}`}`}</div> ${validate_component(Root$1, "Dialog.Root").$$render($$result, { open, onOpenChange: toggleOpen }, {}, {
      default: () => {
        return `${validate_component(Dialog_content, "Dialog.Content").$$render($$result, { class: "h-[600px] max-w-[800px]" }, {}, {
          default: () => {
            return `${validate_component(Textarea, "Textarea").$$render(
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
            )} ${validate_component(Textarea, "Textarea").$$render(
              $$result,
              {
                rows: 20,
                class: "text-lg",
                value: currItem.measures
              },
              {
                value: ($$value) => {
                  currItem.measures = $$value;
                  $$settled = false;
                }
              },
              {}
            )} ${validate_component(Textarea, "Textarea").$$render(
              $$result,
              {
                rows: 20,
                class: "text-lg",
                value: currItem.targets
              },
              {
                value: ($$value) => {
                  currItem.targets = $$value;
                  $$settled = false;
                }
              },
              {}
            )} <div class="flex justify-end">${validate_component(Button, "Button").$$render($$result, {}, {}, {
              default: () => {
                return `Save`;
              }
            })}</div>`;
          }
        })}`;
      }
    })} ${validate_component(Root$1, "Dialog.Root").$$render(
      $$result,
      {
        open: updateOpen,
        onOpenChange: toggleUpdateOpen
      },
      {},
      {
        default: () => {
          return `${validate_component(Dialog_content, "Dialog.Content").$$render($$result, { class: "h-[600px] max-w-[800px]" }, {}, {
            default: () => {
              return `${validate_component(Textarea, "Textarea").$$render(
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
              )} ${validate_component(Textarea, "Textarea").$$render(
                $$result,
                {
                  rows: 20,
                  class: "text-lg",
                  value: currUpdateItem.measures
                },
                {
                  value: ($$value) => {
                    currUpdateItem.measures = $$value;
                    $$settled = false;
                  }
                },
                {}
              )} ${validate_component(Textarea, "Textarea").$$render(
                $$result,
                {
                  rows: 20,
                  class: "text-lg",
                  value: currUpdateItem.targets
                },
                {
                  value: ($$value) => {
                    currUpdateItem.targets = $$value;
                    $$settled = false;
                  }
                },
                {}
              )} <div class="flex justify-end">${validate_component(Button, "Button").$$render($$result, {}, {}, {
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
