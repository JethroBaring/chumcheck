import { c as create_ssr_component, d as each, v as validate_component, e as escape } from "../../../../../../../chunks/ssr.js";
import { C as Card } from "../../../../../../../chunks/card.js";
import "clsx";
import "../../../../../../../chunks/index4.js";
import { T as Textarea } from "../../../../../../../chunks/textarea.js";
import { R as Root, D as Dialog_content } from "../../../../../../../chunks/index8.js";
import "dequal";
import "../../../../../../../chunks/create.js";
import { L as Label } from "../../../../../../../chunks/label.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let rna = data.rna;
  let readiness = data.readiness;
  let readiness_type = [
    "Technology",
    "Market",
    "Acceptance",
    "Organizational",
    "Regulatory",
    "Investment"
  ];
  let open = false;
  function toggleOpen() {
    open = !open;
  }
  let currItem = rna[0];
  let currType = 0;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-xmj682_START -->${$$result.title = `<title>Readiness and Needs Assessment</title>`, ""}<!-- HEAD_svelte-xmj682_END -->`, ""} <div class="flex items-center" data-svelte-h="svelte-1hrphsk"><div class="flex w-full justify-between"><h1 class="text-lg font-semibold md:text-2xl">Readiness and Needs Assessment</h1></div></div> <div class="flex flex-1 flex-col">${rna.length > 0 ? `<div class="flex flex-col items-center gap-6">${each(readiness_type, (r, index) => {
      return `${validate_component(Card, "Card.Root").$$render(
        $$result,
        {
          class: "flex w-1/2 cursor-pointer flex-col gap-2 p-5"
        },
        {},
        {
          default: () => {
            return `<div><span class="text-base font-semibold">${escape(r)} Level</span> <span class="rounded-lg bg-muted px-2 py-1">${escape(readiness[index].readiness_level)}</span></div> <div>${escape(rna.filter((d) => d.readiness_level_id === data.readiness[index].readiness_level_id)[0].rna.substring(0, 100) + "...")}</div> `;
          }
        }
      )}`;
    })}</div>` : `<div class="flex flex-1 items-center justify-center" data-svelte-h="svelte-xun9ae">Readiness and Needs Assessment will show once your mentor is done finalizing it</div>`}</div> ${validate_component(Root, "Dialog.Root").$$render($$result, { open, onOpenChange: toggleOpen }, {}, {
      default: () => {
        return `${validate_component(Dialog_content, "Dialog.Content").$$render($$result, { class: "h-[400px] max-w-[800px]" }, {}, {
          default: () => {
            return `<div><span class="text-base font-semibold">${escape(readiness_type[currType])} Level</span> <span class="rounded-lg bg-muted px-2 py-1">${escape(readiness[currType].readiness_level)}</span></div> <div class="grid h-[250px] w-full gap-1.5">${validate_component(Label, "Label").$$render($$result, {}, {}, {
              default: () => {
                return `Description`;
              }
            })} ${validate_component(Textarea, "Textarea").$$render(
              $$result,
              {
                rows: 20,
                class: "text-lg",
                disabled: true,
                value: currItem.rna
              },
              {
                value: ($$value) => {
                  currItem.rna = $$value;
                  $$settled = false;
                }
              },
              {}
            )}</div>`;
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
