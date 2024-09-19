import { c as create_ssr_component, v as validate_component, d as each, e as escape, a as add_attribute } from "../../../../../../../chunks/ssr.js";
import "../../../../../../../chunks/index4.js";
import { C as Card } from "../../../../../../../chunks/card.js";
import "clsx";
import { T as Textarea } from "../../../../../../../chunks/textarea.js";
import { R as Root, D as Dialog_content } from "../../../../../../../chunks/index8.js";
import { L as Label } from "../../../../../../../chunks/label.js";
import { B as Button } from "../../../../../../../chunks/button.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let readiness = [
    "Technology",
    "Market",
    "Acceptance",
    "Organizational",
    "Regulatory",
    "Investment"
  ];
  let { data } = $$props;
  data.access;
  console.log(data.rna);
  let rna = data.rna;
  let generated = [];
  let open = false;
  let openUnsave = false;
  function toggleOpen() {
    open = !open;
  }
  function toggleOpenUnsave() {
    openUnsave = !openUnsave;
  }
  let currItemUnsave = 0;
  let currItem = rna[0];
  let curType = 0;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-xmj682_START -->${$$result.title = `<title>Readiness and Needs Assessment</title>`, ""}<!-- HEAD_svelte-xmj682_END -->`, ""} <div class="flex items-center"><div class="flex w-full justify-between"><h1 class="text-lg font-semibold md:text-2xl" data-svelte-h="svelte-ydp0vm">Readiness and Needs Assessment</h1> ${data.allow && rna.length === 0 ? `${validate_component(Button, "Button").$$render($$result, { disabled: !data.allow }, {}, {
      default: () => {
        return `Generate RNA`;
      }
    })}` : ``}</div></div> <div class="flex flex-1 flex-col">${rna.length > 0 ? `<div class="flex flex-col items-center gap-6">${each(readiness, (r, index) => {
      return `${validate_component(Card, "Card.Root").$$render(
        $$result,
        {
          class: "flex w-1/2 cursor-pointer flex-col gap-2 p-5"
        },
        {},
        {
          default: () => {
            return `<div><span class="text-base font-semibold">${escape(r)} Level</span> <span class="rounded-lg bg-muted px-2 py-1" data-svelte-h="svelte-a9sevk">7</span></div> <div>${escape(rna.filter((d) => d.readiness_level_id === data.readiness[index].readiness_level_id)[0].rna.substring(0, 100) + "...")}</div> `;
          }
        }
      )}`;
    })}</div>` : `${generated.length > 0 ? `<div class="flex flex-col items-center gap-6">${each(readiness, (r, index) => {
      return `${validate_component(Card, "Card.Root").$$render(
        $$result,
        {
          class: "flex w-1/2 cursor-pointer flex-col gap-2 p-5 "
        },
        {},
        {
          default: () => {
            return `<div><span class="text-base font-semibold">${escape(r)} Level</span> <span class="rounded-lg bg-muted px-2 py-1">${escape(data.readiness[index].readiness_level)}</span></div> <div>${escape(generated[index].substring(0, 100) + "...")}</div> `;
          }
        }
      )}`;
    })} <form method="post" class="flex flex-col gap-3">${each(readiness, (r, index) => {
      return `<input type="hidden"${add_attribute("name", `${r}`, 0)}${add_attribute("value", data.readiness[index].readiness_level_id, 0)}> <input type="hidden"${add_attribute("name", `${r}rna`, 0)}${add_attribute("value", generated[index], 0)}>`;
    })} <div class="flex justify-end">${validate_component(Button, "Button").$$render($$result, { type: "submit" }, {}, {
      default: () => {
        return `Save`;
      }
    })}</div></form></div>` : `${`${data.allow ? `<div class="flex flex-1 items-center justify-center" data-svelte-h="svelte-1c9hxee"><h1>Generate Readiness and Needs Assessment by clicking the button</h1></div>` : `<div class="flex flex-1 items-center justify-center" data-svelte-h="svelte-rctt4"><h1>Finish the rubrics first to be able to generate Readiness and Needs Assessment for startup</h1></div>`}`}`}`}</div> ${validate_component(Root, "Dialog.Root").$$render($$result, { open, onOpenChange: toggleOpen }, {}, {
      default: () => {
        return `${validate_component(Dialog_content, "Dialog.Content").$$render($$result, { class: "h-[400px] max-w-[800px]" }, {}, {
          default: () => {
            return `<div><span class="text-base font-semibold">${escape(readiness[curType])} Level</span> <span class="rounded-lg bg-muted px-2 py-1" data-svelte-h="svelte-a9sevk">7</span></div> <div class="grid h-[250px] w-full gap-1.5">${validate_component(Label, "Label").$$render($$result, {}, {}, {
              default: () => {
                return `Description`;
              }
            })} ${validate_component(Textarea, "Textarea").$$render(
              $$result,
              {
                rows: 20,
                class: "text-lg",
                value: currItem.rna
              },
              {
                value: ($$value) => {
                  currItem.rna = $$value;
                  $$settled = false;
                }
              },
              {}
            )}</div> <div class="flex justify-end">${validate_component(Button, "Button").$$render($$result, {}, {}, {
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
        open: openUnsave,
        onOpenChange: toggleOpenUnsave
      },
      {},
      {
        default: () => {
          return `${validate_component(Dialog_content, "Dialog.Content").$$render($$result, { class: "h-[400px] max-w-[800px]" }, {}, {
            default: () => {
              return `<div><span class="text-base font-semibold">${escape(readiness[curType])} Level</span> <span class="rounded-lg bg-muted px-2 py-1" data-svelte-h="svelte-a9sevk">7</span></div> <div class="grid h-[250px] w-full gap-1.5">${validate_component(Label, "Label").$$render($$result, {}, {}, {
                default: () => {
                  return `Description`;
                }
              })} ${validate_component(Textarea, "Textarea").$$render(
                $$result,
                {
                  rows: 20,
                  class: "text-lg",
                  value: generated[currItemUnsave]
                },
                {
                  value: ($$value) => {
                    generated[currItemUnsave] = $$value;
                    $$settled = false;
                  }
                },
                {}
              )}</div>`;
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
