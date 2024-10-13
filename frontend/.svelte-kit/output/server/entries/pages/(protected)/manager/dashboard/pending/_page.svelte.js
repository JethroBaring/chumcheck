import { c as create_ssr_component, e as escape, d as each, v as validate_component } from "../../../../../../chunks/ssr.js";
import { E as Ellipsis, a as Eye, R as RadarChart } from "../../../../../../chunks/RadarChart.js";
import "../../../../../../chunks/index4.js";
import { C as Card } from "../../../../../../chunks/card.js";
import { C as Card_content } from "../../../../../../chunks/card-content.js";
import "clsx";
import { R as Root, T as Trigger, D as Dropdown_menu_content, a as Dropdown_menu_label, b as Dropdown_menu_item } from "../../../../../../chunks/index6.js";
import { I as Input$1 } from "../../../../../../chunks/input.js";
import { T as Table, a as Table_header, b as Table_row, c as Table_head, d as Table_body, e as Table_cell } from "../../../../../../chunks/table-row.js";
import "dequal";
import "../../../../../../chunks/create.js";
import { T as Tabs_content } from "../../../../../../chunks/tabs-content.js";
import { L as Label } from "../../../../../../chunks/label.js";
import { R as Root$1, D as Dialog_content } from "../../../../../../chunks/index8.js";
import { T as Textarea } from "../../../../../../chunks/textarea.js";
import { R as Radio_group, a as Radio_group_item, I as Input } from "../../../../../../chunks/index10.js";
import { B as Button } from "../../../../../../chunks/button.js";
const Assessment = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { questions, answers, type } = $$props;
  if ($$props.questions === void 0 && $$bindings.questions && questions !== void 0)
    $$bindings.questions(questions);
  if ($$props.answers === void 0 && $$bindings.answers && answers !== void 0)
    $$bindings.answers(answers);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  return `<div class="flex flex-col gap-3"><h2>${escape(type)}</h2> ${each(questions, (question, index) => {
    return `<div class="grid w-full gap-1.5">${validate_component(Label, "Label").$$render($$result, { for: "message" }, {}, {
      default: () => {
        return `${escape(question.question)}`;
      }
    })} ${validate_component(Textarea, "Textarea").$$render(
      $$result,
      {
        placeholder: "Type your message here.",
        id: "message",
        value: answers[index].response,
        readonly: true
      },
      {},
      {}
    )} <input type="hidden"></div> ${validate_component(Radio_group, "RadioGroup.Root").$$render(
      $$result,
      {
        value: `${answers[index].score}`,
        class: "flex gap-5"
      },
      {},
      {
        default: () => {
          return `<div class="flex flex-col items-center justify-center gap-1">${validate_component(Radio_group_item, "RadioGroup.Item").$$render($$result, { value: "1", id: "one" }, {}, {})} ${validate_component(Label, "Label").$$render($$result, { for: "one", class: "text-[12px]" }, {}, {
            default: () => {
              return `1`;
            }
          })}</div> <div class="flex flex-col items-center justify-center gap-1">${validate_component(Radio_group_item, "RadioGroup.Item").$$render($$result, { value: "2", id: "two" }, {}, {})} ${validate_component(Label, "Label").$$render($$result, { for: "two", class: "text-[12px]" }, {}, {
            default: () => {
              return `2`;
            }
          })}</div> <div class="flex flex-col items-center justify-center gap-1">${validate_component(Radio_group_item, "RadioGroup.Item").$$render($$result, { value: "3", id: "three" }, {}, {})} ${validate_component(Label, "Label").$$render($$result, { for: "three", class: "text-[12px]" }, {}, {
            default: () => {
              return `3`;
            }
          })}</div> <div class="flex flex-col items-center justify-center gap-1">${validate_component(Radio_group_item, "RadioGroup.Item").$$render($$result, { value: "4", id: "four" }, {}, {})} ${validate_component(Label, "Label").$$render($$result, { for: "four", class: "text-[12px]" }, {}, {
            default: () => {
              return `4`;
            }
          })}</div> <div class="flex flex-col items-center justify-center gap-1">${validate_component(Radio_group_item, "RadioGroup.Item").$$render($$result, { value: "5", id: "five" }, {}, {})} ${validate_component(Label, "Label").$$render($$result, { for: "five", class: "text-[12px]" }, {}, {
            default: () => {
              return `5`;
            }
          })}</div> ${validate_component(Input, "RadioGroup.Input").$$render($$result, { name: "data_privacy" }, {}, {})} `;
        }
      }
    )}`;
  })}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  data.access;
  let applicants = data.applicants.filter((d) => d.qualification_status === 1);
  let showPendingDialog = false;
  function togglePendingdialog() {
    showPendingDialog = !showPendingDialog;
  }
  let inf, que, ans, calc;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Tabs_content, "Tabs.Content").$$render($$result, { value: "pending" }, {}, {
    default: () => {
      return `${validate_component(Card, "Card.Root").$$render(
        $$result,
        {
          "data-x-chunk-name": "dashboard-06-chunk-1",
          "data-x-chunk-description": "A list of products in a table with actions. Each row has an image, name, status, price, total sales, created at and actions."
        },
        {},
        {
          default: () => {
            return `${validate_component(Card_content, "Card.Content").$$render($$result, { class: "pt-[24px]" }, {}, {
              default: () => {
                return `${validate_component(Table, "Table.Root").$$render($$result, {}, {}, {
                  default: () => {
                    return `${validate_component(Table_header, "Table.Header").$$render($$result, {}, {}, {
                      default: () => {
                        return `${validate_component(Table_row, "Table.Row").$$render($$result, {}, {}, {
                          default: () => {
                            return `${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                              default: () => {
                                return `Startup Name`;
                              }
                            })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                              default: () => {
                                return `Group Name`;
                              }
                            })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                              default: () => {
                                return `Leader Name`;
                              }
                            })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                              default: () => {
                                return `<span class="sr-only" data-svelte-h="svelte-1nvuc3u">Actions</span>`;
                              }
                            })}`;
                          }
                        })}`;
                      }
                    })} ${validate_component(Table_body, "Table.Body").$$render($$result, {}, {}, {
                      default: () => {
                        return `${each(applicants, (applicant) => {
                          return `${validate_component(Table_row, "Table.Row").$$render($$result, { class: "h-[80px]" }, {}, {
                            default: () => {
                              return `${validate_component(Table_cell, "Table.Cell").$$render($$result, { class: "font-medium" }, {}, {
                                default: () => {
                                  return `${escape(applicant.name)}`;
                                }
                              })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                                default: () => {
                                  return `${escape(applicant.group_name)}`;
                                }
                              })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, { class: "hidden md:table-cell" }, {}, {
                                default: () => {
                                  return `${escape(applicant.leader_first_name)} ${escape(applicant.leader_last_name)}`;
                                }
                              })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                                default: () => {
                                  return `${validate_component(Root, "DropdownMenu.Root").$$render($$result, {}, {}, {
                                    default: () => {
                                      return `${validate_component(Trigger, "DropdownMenu.Trigger").$$render($$result, { asChild: true }, {}, {
                                        default: ({ builder }) => {
                                          return `${validate_component(Button, "Button").$$render(
                                            $$result,
                                            {
                                              "aria-haspopup": "true",
                                              size: "icon",
                                              variant: "ghost",
                                              builders: [builder]
                                            },
                                            {},
                                            {
                                              default: () => {
                                                return `${validate_component(Ellipsis, "Ellipsis").$$render($$result, { class: "h-4 w-4" }, {}, {})} <span class="sr-only" data-svelte-h="svelte-zt9sly">Toggle menu</span> `;
                                              }
                                            }
                                          )} `;
                                        }
                                      })} ${validate_component(Dropdown_menu_content, "DropdownMenu.Content").$$render($$result, { align: "end" }, {}, {
                                        default: () => {
                                          return `${validate_component(Dropdown_menu_label, "DropdownMenu.Label").$$render($$result, {}, {}, {
                                            default: () => {
                                              return `Action`;
                                            }
                                          })} ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, {}, {}, {
                                            default: () => {
                                              return `Approve`;
                                            }
                                          })} ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, {}, {}, {
                                            default: () => {
                                              return `Reject`;
                                            }
                                          })} ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, {}, {}, {
                                            default: () => {
                                              return `View`;
                                            }
                                          })} `;
                                        }
                                      })} `;
                                    }
                                  })} `;
                                }
                              })} `;
                            }
                          })}`;
                        })}`;
                      }
                    })}`;
                  }
                })}`;
              }
            })}`;
          }
        }
      )}`;
    }
  })} ${validate_component(Root$1, "Dialog.Root").$$render(
    $$result,
    {
      open: showPendingDialog,
      onOpenChange: togglePendingdialog
    },
    {},
    {
      default: () => {
        return `${validate_component(Dialog_content, "Dialog.Content").$$render($$result, { class: "h-[90%] max-w-[800px]" }, {}, {
          default: () => {
            return `<div class="flex flex-col overflow-scroll"><div class="flex h-0 flex-col gap-5"> <div class="flex flex-col gap-3"><h1 class="text-lg font-semibold" data-svelte-h="svelte-qcvjiq">Project Details</h1> <div class="grid gap-2">${validate_component(Label, "Label").$$render($$result, { for: "email" }, {}, {
              default: () => {
                return `Startup Name`;
              }
            })} ${validate_component(Input$1, "Input").$$render(
              $$result,
              {
                readonly: true,
                name: "email",
                id: "email",
                type: "email",
                placeholder: "m@example.com",
                value: inf.name
              },
              {},
              {}
            )}</div> <div class="grid gap-2">${validate_component(Label, "Label").$$render($$result, { for: "email", class: "flex gap-2" }, {}, {
              default: () => {
                return `Capsule Proposal

							${`<button>${validate_component(Eye, "Eye").$$render($$result, { class: "h-4 w-4 cursor-pointer" }, {}, {})}</button>`}`;
              }
            })} <div class="flex w-full justify-center">${``}</div></div></div>  <div class="flex flex-col gap-3"><h1 class="text-lg font-semibold" data-svelte-h="svelte-11kjis8">Group Information</h1> <div class="grid gap-2">${validate_component(Label, "Label").$$render($$result, { for: "email" }, {}, {
              default: () => {
                return `Group Name`;
              }
            })} ${validate_component(Input$1, "Input").$$render(
              $$result,
              {
                readonly: true,
                name: "email",
                id: "email",
                type: "email",
                placeholder: "m@example.com",
                value: inf.group_name
              },
              {},
              {}
            )}</div> <div class="grid gap-2">${validate_component(Label, "Label").$$render($$result, { for: "email" }, {}, {
              default: () => {
                return `Leader`;
              }
            })} <div class="flex gap-3">${validate_component(Input$1, "Input").$$render(
              $$result,
              {
                readonly: true,
                name: "email",
                id: "email",
                type: "email",
                placeholder: "m@example.com",
                value: inf.leader_email
              },
              {},
              {}
            )} ${validate_component(Input$1, "Input").$$render(
              $$result,
              {
                readonly: true,
                name: "email",
                id: "email",
                type: "text",
                placeholder: "m@example.com",
                value: inf.leader_first_name
              },
              {},
              {}
            )} ${validate_component(Input$1, "Input").$$render(
              $$result,
              {
                readonly: true,
                name: "email",
                id: "email",
                type: "text",
                placeholder: "m@example.com",
                value: inf.leader_last_name
              },
              {},
              {}
            )}</div></div> ${each(inf.members, (member, i) => {
              return `<div class="grid gap-2">${validate_component(Label, "Label").$$render($$result, { for: "email" }, {}, {
                default: () => {
                  return `Member #${escape(i + 1)}`;
                }
              })} <div class="flex gap-3">${validate_component(Input$1, "Input").$$render(
                $$result,
                {
                  readonly: true,
                  name: "email",
                  id: "email",
                  type: "email",
                  placeholder: "m@example.com",
                  value: member.email
                },
                {},
                {}
              )} ${validate_component(Input$1, "Input").$$render(
                $$result,
                {
                  readonly: true,
                  name: "email",
                  id: "email",
                  type: "text",
                  placeholder: "m@example.com",
                  value: member.first_name
                },
                {},
                {}
              )} ${validate_component(Input$1, "Input").$$render(
                $$result,
                {
                  readonly: true,
                  name: "email",
                  id: "email",
                  type: "text",
                  placeholder: "m@example.com",
                  value: member.last_name
                },
                {},
                {}
              )}</div> </div>`;
            })} ${inf.university_name ? `<div class="grid gap-2">${validate_component(Label, "Label").$$render($$result, { for: "email" }, {}, {
              default: () => {
                return `University Name`;
              }
            })} ${validate_component(Input$1, "Input").$$render(
              $$result,
              {
                readonly: true,
                name: "email",
                id: "email",
                type: "email",
                placeholder: "m@example.com",
                value: inf.university_name
              },
              {},
              {}
            )}</div>` : ``}</div>  <div class="flex flex-col gap-3"><h1 class="text-lg font-semibold" data-svelte-h="svelte-1rekk8u">Technology and Commercialization Calculator</h1> <div class="p-10">${validate_component(RadarChart, "RadarChart").$$render(
              $$result,
              {
                id: inf.id,
                min: 0,
                max: 9,
                data: [
                  calc.technology_score,
                  calc.product_development,
                  calc.product_definition,
                  calc.competitive_landscape,
                  calc.team,
                  calc.go_to_market,
                  calc.supply_chain
                ],
                labels: [
                  "Technology",
                  "Product Development",
                  "Product Definition",
                  "Competitive Landscape",
                  "Team",
                  "Go-To-Market",
                  "Supply Chain"
                ]
              },
              {},
              {}
            )}</div></div>  <div class="flex flex-col gap-3"><h1 class="text-lg font-semibold" data-svelte-h="svelte-37evcf">URAT Assessment</h1> <div class="flex flex-col gap-3">${validate_component(Assessment, "Assessment").$$render(
              $$result,
              {
                questions: que.filter((d) => d.readiness_type === "Technology"),
                answers: ans.filter((d) => d.readiness_type === "Technology"),
                type: "Technology"
              },
              {},
              {}
            )} ${validate_component(Assessment, "Assessment").$$render(
              $$result,
              {
                questions: que.filter((d) => d.readiness_type === "Market"),
                answers: ans.filter((d) => d.readiness_type === "Market"),
                type: "Market"
              },
              {},
              {}
            )} ${validate_component(Assessment, "Assessment").$$render(
              $$result,
              {
                questions: que.filter((d) => d.readiness_type === "Regulatory"),
                answers: ans.filter((d) => d.readiness_type === "Regulatory"),
                type: "Regulatory"
              },
              {},
              {}
            )} ${validate_component(Assessment, "Assessment").$$render(
              $$result,
              {
                questions: que.filter((d) => d.readiness_type === "Acceptance"),
                answers: ans.filter((d) => d.readiness_type === "Acceptance"),
                type: "Acceptance"
              },
              {},
              {}
            )} ${validate_component(Assessment, "Assessment").$$render(
              $$result,
              {
                questions: que.filter((d) => d.readiness_type === "Organizational"),
                answers: ans.filter((d) => d.readiness_type === "Organizational"),
                type: "Organizational"
              },
              {},
              {}
            )} ${validate_component(Assessment, "Assessment").$$render(
              $$result,
              {
                questions: que.filter((d) => d.readiness_type === "Investment"),
                answers: ans.filter((d) => d.readiness_type === "Investment"),
                type: "Investment"
              },
              {},
              {}
            )}</div></div> <div class="flex justify-end">${validate_component(Button, "Button").$$render($$result, {}, {}, {
              default: () => {
                return `Save Rating`;
              }
            })}</div></div></div>`;
          }
        })}`;
      }
    }
  )}`;
});
export {
  Page as default
};
