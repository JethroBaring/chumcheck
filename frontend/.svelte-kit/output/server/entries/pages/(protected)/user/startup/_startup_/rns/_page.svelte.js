import { c as create_ssr_component, d as each, v as validate_component, e as escape } from "../../../../../../../chunks/ssr.js";
import { P as Plus } from "../../../../../../../chunks/plus.js";
import "../../../../../../../chunks/client.js";
import "../../../../../../../chunks/index11.js";
import { R as Root, D as Dialog_content } from "../../../../../../../chunks/index8.js";
import "../../../../../../../chunks/index4.js";
import "clsx";
import { B as Badge } from "../../../../../../../chunks/badge.js";
import { T as Target } from "../../../../../../../chunks/target.js";
import { L as Label } from "../../../../../../../chunks/label.js";
import { T as Textarea } from "../../../../../../../chunks/textarea.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  function toggleOpen() {
    open = !open;
  }
  let { data } = $$props;
  data.access;
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
  let currItem = items[0].items[0].subItems[0];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-1165yh7_START -->${$$result.title = `<title>Recommended Next Steps</title>`, ""}<!-- HEAD_svelte-1165yh7_END -->`, ""} <div class="flex items-center" data-svelte-h="svelte-18tew9f"><div class="flex w-full justify-between"><h1 class="text-lg font-semibold md:text-2xl">Recommended Next Steps</h1></div></div> <div class="flex flex-1 gap-6">${tasks.length > 0 && tasks[0].status !== 1 ? `${each(items, (item, index) => {
      return `<div class="flex flex-1 flex-col gap-1"><p class="text-[17px] font-medium">${escape(item.title)}</p> <div class="flex flex-1 flex-col gap-6 overflow-scroll rounded-lg bg-muted p-4 dark:bg-muted/40"><div class="flex h-0 flex-col gap-6">${each(item.items, (subItem, subIndex) => {
        return `<div class="flex flex-col gap-3"><div class="flex items-center gap-3"><p>${escape(subItem.subTitle)}</p> <button>${validate_component(Plus, "Plus").$$render($$result, { class: "h-4 w-4" }, {}, {})} </button></div> <div class="flex flex-col gap-4">${subItem.subItems.length === 0 ? `<div class="h-40"></div>` : `${each(subItem.subItems, (item2, i) => {
          return `<div class="flex h-40 cursor-pointer flex-col gap-3 rounded-lg bg-white/60 p-5 dark:bg-muted"><p>${escape(item2.description.substring(0, 80) + "...")}</p> ${validate_component(Badge, "Badge").$$render($$result, { class: "w-fit" }, {}, {
            default: () => {
              return `${escape(item2.readiness_type_rl_type)}`;
            }
          })} <div class="flex items-center gap-1">${validate_component(Target, "Target").$$render($$result, { class: "h-4 w-4" }, {}, {})} <p class="text-sm">Target Level: ${escape(item2.target_level_level)}</p></div> </div>`;
        })}`}</div> </div>`;
      })} </div></div> </div>`;
    })}` : `<div class="flex flex-1 items-center justify-center" data-svelte-h="svelte-modoj1">Recommended Next Steps Board will show once your mentor is done finalizing it</div>`}</div>  ${validate_component(Root, "Dialog.Root").$$render($$result, { open, onOpenChange: toggleOpen }, {}, {
      default: () => {
        return `${validate_component(Dialog_content, "Dialog.Content").$$render($$result, { class: "h-[450px] max-w-[800px]" }, {}, {
          default: () => {
            return `<div class="grid w-full gap-1.5 h-[250px]">${validate_component(Label, "Label").$$render($$result, {}, {}, {
              default: () => {
                return `Description`;
              }
            })} ${validate_component(Textarea, "Textarea").$$render(
              $$result,
              {
                rows: 20,
                class: "text-lg",
                disabled: true,
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
            })} <div class="flex items-center gap-1">${validate_component(Target, "Target").$$render($$result, { class: "h-4 w-4" }, {}, {})} <p class="text-sm">Target Level: ${escape(currItem.target_level_level)}</p></div>`;
          }
        })}`;
      }
    })}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
