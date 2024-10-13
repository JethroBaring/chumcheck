import { c as create_ssr_component, v as validate_component, d as each, e as escape } from "../../../../../../../chunks/ssr.js";
import "../../../../../../../chunks/index3.js";
import "../../../../../../../chunks/index4.js";
import { C as Card } from "../../../../../../../chunks/card.js";
import "clsx";
import { T as Textarea } from "../../../../../../../chunks/textarea.js";
import { R as Root, D as Dialog_content } from "../../../../../../../chunks/index8.js";
import { R as Root$1, S as Select_trigger, V as Value, a as Select_content, b as Select_item } from "../../../../../../../chunks/index9.js";
import { L as Label } from "../../../../../../../chunks/label.js";
import { B as Button } from "../../../../../../../chunks/button.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  data.access;
  let roadblocks = data.roadblocks;
  let generated = [];
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
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-9w0jt4_START -->${$$result.title = `<title>Roadblocks</title>`, ""}<!-- HEAD_svelte-9w0jt4_END -->`, ""} <div class="flex items-center"><div class="flex w-full justify-between"><h1 class="text-lg font-semibold md:text-2xl" data-svelte-h="svelte-1fsp508">Roadblocks</h1> ${data.allow && roadblocks.length === 0 ? `${validate_component(Button, "Button").$$render($$result, { disabled: !data.allow }, {}, {
      default: () => {
        return `Generate Roadblocks`;
      }
    })}` : ``}</div></div> <div class="flex flex-1 flex-col">${roadblocks.length > 0 ? `<div class="flex flex-col items-center gap-6">${each(roadblocks, (r, index) => {
      return `${validate_component(Card, "Card.Root").$$render(
        $$result,
        {
          class: "flex w-1/2 cursor-pointer flex-col gap-2 p-5"
        },
        {},
        {
          default: () => {
            return `<div class="flex justify-between"><div><span class="text-base font-semibold" data-svelte-h="svelte-1atk3p0">Risk</span> <span class="rounded-lg bg-muted px-2 py-1">${escape(index + 1)}</span></div> <div>Assignee: ${r.assignee_id ? `${escape(`${data.startup.members.filter((d) => d.user_id === r.assignee_id)[0].first_name} ${data.startup.members.filter((d) => d.user_id === r.assignee_id)[0].last_name}`)}` : `None`} </div></div> <div>${escape(r.description.substring(0, 100) + "...")}</div> `;
          }
        }
      )}`;
    })}</div>` : `${generated.length > 0 ? `${each(roadblocks, (r, index) => {
      return `${validate_component(Card, "Card.Root").$$render(
        $$result,
        {
          class: "flex w-1/2 cursor-pointer flex-col gap-2 p-5"
        },
        {},
        {
          default: () => {
            return `<div class="flex justify-between"><div><span class="text-base font-semibold" data-svelte-h="svelte-1atk3p0">Risk</span> <span class="rounded-lg bg-muted px-2 py-1">${escape(index + 1)}</span></div> <div data-svelte-h="svelte-134jf48">Assignee: Jethro Baring</div></div> <div>${escape(r.description.substring(0, 100) + "...")}</div> `;
          }
        }
      )}`;
    })}` : `${`${data.allow ? `<div class="flex flex-1 items-center justify-center" data-svelte-h="svelte-fzp664"><h1>Generate Roadblocks by clicking the button</h1></div>` : `<div class="flex flex-1 items-center justify-center" data-svelte-h="svelte-16atfp6"><h1>Finish the Initiatives first to be able to generate Roadblocks for startup</h1></div>`}`}`}`}</div> ${validate_component(Root, "Dialog.Root").$$render($$result, { open, onOpenChange: toggleOpen }, {}, {
      default: () => {
        return `${validate_component(Dialog_content, "Dialog.Content").$$render($$result, { class: "h-[550px] max-w-[800px]" }, {}, {
          default: () => {
            return `<div><span class="text-base font-semibold" data-svelte-h="svelte-1atk3p0">Risk</span> <span class="rounded-lg bg-muted px-2 py-1">${escape(currIndex + 1)}</span></div> <div class="grid w-full gap-1.5 h-[160px]">${validate_component(Label, "Label").$$render($$result, {}, {}, {
              default: () => {
                return `Description`;
              }
            })} ${validate_component(Textarea, "Textarea").$$render(
              $$result,
              {
                rows: 15,
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
            )}</div> <div class="grid w-full gap-1.5 h-[160px]">${validate_component(Label, "Label").$$render($$result, {}, {}, {
              default: () => {
                return `Measures`;
              }
            })} ${validate_component(Textarea, "Textarea").$$render(
              $$result,
              {
                rows: 15,
                class: "text-lg",
                value: currItem.fix
              },
              {
                value: ($$value) => {
                  currItem.fix = $$value;
                  $$settled = false;
                }
              },
              {}
            )}</div> ${validate_component(Root$1, "Select.Root").$$render(
              $$result,
              {
                selected: currItem.assignee_id.value,
                onSelectedChange: (v) => {
                  v && (currItem.assignee_id = v.value);
                }
              },
              {},
              {
                default: () => {
                  return `${validate_component(Select_trigger, "Select.Trigger").$$render($$result, { class: "w-[180px]" }, {}, {
                    default: () => {
                      return `${validate_component(Value, "Select.Value").$$render($$result, { placeholder: "Choose a mentor" }, {}, {})}`;
                    }
                  })} ${validate_component(Select_content, "Select.Content").$$render($$result, {}, {}, {
                    default: () => {
                      return `${each(data.startup.members, (member) => {
                        return `${validate_component(Select_item, "Select.Item").$$render($$result, { value: member.user_id }, {}, {
                          default: () => {
                            return `${escape(`${member.first_name} ${member.last_name}`)}`;
                          }
                        })}`;
                      })}`;
                    }
                  })}`;
                }
              }
            )} <div class="flex justify-end">${validate_component(Button, "Button").$$render($$result, {}, {}, {
              default: () => {
                return `Save`;
              }
            })}</div>`;
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
