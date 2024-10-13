import { c as create_ssr_component, d as each, v as validate_component, e as escape, i as add_classes } from "../../../../../../../chunks/ssr.js";
import "../../../../../../../chunks/index4.js";
import { C as Card } from "../../../../../../../chunks/card.js";
import "clsx";
import { T as Textarea } from "../../../../../../../chunks/textarea.js";
import { R as Root, D as Dialog_content } from "../../../../../../../chunks/index8.js";
import "dequal";
import "../../../../../../../chunks/create.js";
import { L as Label } from "../../../../../../../chunks/label.js";
import { I as Input } from "../../../../../../../chunks/input.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let roadblocks = data.roadblocks;
  let open = false;
  function toggleOpen() {
    open = !open;
  }
  let currItem = roadblocks[0];
  let currIndex = 0;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-9w0jt4_START -->${$$result.title = `<title>Roadblocks</title>`, ""}<!-- HEAD_svelte-9w0jt4_END -->`, ""} <div class="flex items-center" data-svelte-h="svelte-1mvgju2"><div class="flex w-full justify-between"><h1 class="text-lg font-semibold md:text-2xl">Roadblocks</h1></div></div> <div class="flex flex-1 flex-col">${roadblocks.length > 0 ? `<div class="flex flex-col items-center gap-6">${each(roadblocks, (r, index) => {
      return `${validate_component(Card, "Card.Root").$$render(
        $$result,
        {
          class: "flex w-1/2 cursor-pointer flex-col gap-2 p-5"
        },
        {},
        {
          default: () => {
            return `<div class="flex justify-between"><div><span class="text-base font-semibold" data-svelte-h="svelte-1atk3p0">Risk</span> <span class="rounded-lg bg-muted px-2 py-1">${escape(index + 1)}</span></div> <div${add_classes((data.userId === r.assignee_id ? "text-green-500" : "").trim())}>Assignee: ${r.assignee_id ? `${escape(`${data.startup.members.filter((d) => d.user_id === r.assignee_id)[0].first_name} ${data.startup.members.filter((d) => d.user_id === r.assignee_id)[0].last_name}`)}` : `None`} </div></div> <div>${escape(r.description.substring(0, 100) + "...")}</div> `;
          }
        }
      )}`;
    })}</div>` : `<div class="flex flex-1 items-center justify-center" data-svelte-h="svelte-br71do">Roadblocks will show once your mentor is done finalizing it</div>`}</div>  ${validate_component(Root, "Dialog.Root").$$render($$result, { open, onOpenChange: toggleOpen }, {}, {
      default: () => {
        return `${validate_component(Dialog_content, "Dialog.Content").$$render($$result, { class: "h-[550px] max-w-[800px]" }, {}, {
          default: () => {
            return `<div><span class="text-base font-semibold" data-svelte-h="svelte-1atk3p0">Risk</span> <span class="rounded-lg bg-muted px-2 py-1">${escape(currIndex + 1)}</span></div> <div class="grid h-[160px] w-full gap-1.5">${validate_component(Label, "Label").$$render($$result, {}, {}, {
              default: () => {
                return `Description`;
              }
            })} ${validate_component(Textarea, "Textarea").$$render(
              $$result,
              {
                rows: 15,
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
            )}</div> <div class="grid h-[160px] w-full gap-1.5">${validate_component(Label, "Label").$$render($$result, {}, {}, {
              default: () => {
                return `Measures`;
              }
            })} ${validate_component(Textarea, "Textarea").$$render(
              $$result,
              {
                rows: 15,
                class: "text-lg",
                disabled: true,
                value: currItem.fix
              },
              {
                value: ($$value) => {
                  currItem.fix = $$value;
                  $$settled = false;
                }
              },
              {}
            )}</div> <div class="grid h-[100px] w-full gap-1.5">${validate_component(Label, "Label").$$render($$result, {}, {}, {
              default: () => {
                return `Assignee`;
              }
            })} ${currItem.assignee_id ? `${validate_component(Input, "Input").$$render(
              $$result,
              {
                value: `${data.startup.members.filter((d) => d.user_id === currItem.assignee_id)[0].first_name} ${data.startup.members.filter((d) => d.user_id === currItem.assignee_id)[0].last_name}`,
                class: "text-lg",
                disabled: true
              },
              {},
              {}
            )}` : `${validate_component(Input, "Input").$$render(
              $$result,
              {
                value: "None",
                class: "text-lg",
                disabled: true
              },
              {},
              {}
            )}`}</div>`;
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
