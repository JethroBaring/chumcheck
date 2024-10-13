import { c as create_ssr_component, v as validate_component, d as each, a as add_attribute, e as escape } from "./ssr.js";
import { C as Card } from "./card.js";
import { C as Card_content } from "./card-content.js";
import "clsx";
import { T as Table, a as Table_header, b as Table_row, c as Table_head, d as Table_body, e as Table_cell } from "./table-row.js";
import "dequal";
import "./create.js";
import { T as Tabs_content } from "./tabs-content.js";
const Rubrics = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { questions, type } = $$props;
  console.log(type);
  if ($$props.questions === void 0 && $$bindings.questions && questions !== void 0)
    $$bindings.questions(questions);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  return `${validate_component(Tabs_content, "Tabs.Content").$$render($$result, { value: `${type}` }, {}, {
    default: () => {
      return `<div class="flex flex-col gap-3">${each(questions, (question, index) => {
        return `<div class="flex gap-3"><input type="radio"${add_attribute("name", `${type}ReadinessLevel`, 0)} class="radio"${add_attribute("value", question.id, 0)} ${index === 0 ? "checked" : ""}> <p>Level ${escape(question.level)}: ${escape(question.name)}</p></div> ${validate_component(Card, "Card.Root").$$render(
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
                              return `${validate_component(Table_head, "Table.Head").$$render($$result, { class: "text-center" }, {}, {
                                default: () => {
                                  return `Criteria`;
                                }
                              })} ${validate_component(Table_head, "Table.Head").$$render($$result, { class: "text-center" }, {}, {
                                default: () => {
                                  return `Excellent (5)`;
                                }
                              })} ${validate_component(Table_head, "Table.Head").$$render($$result, { class: "text-center" }, {}, {
                                default: () => {
                                  return `Good (4)`;
                                }
                              })} ${validate_component(Table_head, "Table.Head").$$render($$result, { class: "text-center" }, {}, {
                                default: () => {
                                  return `Fair (3)`;
                                }
                              })} ${validate_component(Table_head, "Table.Head").$$render($$result, { class: "text-center" }, {}, {
                                default: () => {
                                  return `Poor (2)`;
                                }
                              })} ${validate_component(Table_head, "Table.Head").$$render($$result, { class: "text-center" }, {}, {
                                default: () => {
                                  return `Very Poor (1)`;
                                }
                              })} ${validate_component(Table_head, "Table.Head").$$render($$result, { class: "text-center" }, {}, {
                                default: () => {
                                  return `Remark`;
                                }
                              })} `;
                            }
                          })} `;
                        }
                      })} ${validate_component(Table_body, "Table.Body").$$render($$result, {}, {}, {
                        default: () => {
                          return `${each(question.level_criteria, (criteria, i) => {
                            return `${validate_component(Table_row, "Table.Row").$$render($$result, { class: "h-[50px]" }, {}, {
                              default: () => {
                                return `<input type="hidden"${add_attribute("name", `${type}Criteria${question.level}${i + 1}`, 0)}${add_attribute("value", `${criteria.id}`, 0)}> ${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                                  default: () => {
                                    return `${escape(criteria.criteria)}`;
                                  }
                                })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, { class: "text-center" }, {}, {
                                  default: () => {
                                    return `<input type="radio"${add_attribute("name", `${type}${question.level}${i + 1}`, 0)} value="5">`;
                                  }
                                })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, { class: "text-center" }, {}, {
                                  default: () => {
                                    return `<input type="radio"${add_attribute("name", `${type}${question.level}${i + 1}`, 0)} value="4"${add_attribute("data-tip", criteria.good_description, 0)}>`;
                                  }
                                })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, { class: "text-center" }, {}, {
                                  default: () => {
                                    return `<input type="radio"${add_attribute("name", `${type}${question.level}${i + 1}`, 0)} value="3"${add_attribute("data-tip", criteria.fair_description, 0)}>`;
                                  }
                                })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, { class: "text-center" }, {}, {
                                  default: () => {
                                    return `<input type="radio"${add_attribute("name", `${type}${question.level}${i + 1}`, 0)} value="2"${add_attribute("data-tip", criteria.poor_description, 0)}>`;
                                  }
                                })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, { class: "text-center" }, {}, {
                                  default: () => {
                                    return `<input type="radio"${add_attribute("name", `${type}${question.level}${i + 1}`, 0)} value="1" class="radio tooltip"${add_attribute("data-tip", criteria.very_poor_description, 0)} checked>`;
                                  }
                                })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, { class: "text-center" }, {}, {
                                  default: () => {
                                    return `<textarea${add_attribute("name", `${type}Remark${question.level}${i + 1}`, 0)} class="textarea h-10 max-w-full"></textarea> `;
                                  }
                                })} `;
                              }
                            })}`;
                          })} `;
                        }
                      })} `;
                    }
                  })} `;
                }
              })} `;
            }
          }
        )}`;
      })}</div>`;
    }
  })}`;
});
const ReadOnlyRubrics = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { questions, type, scores, readiness_level } = $$props;
  console.log(type);
  if ($$props.questions === void 0 && $$bindings.questions && questions !== void 0)
    $$bindings.questions(questions);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.scores === void 0 && $$bindings.scores && scores !== void 0)
    $$bindings.scores(scores);
  if ($$props.readiness_level === void 0 && $$bindings.readiness_level && readiness_level !== void 0)
    $$bindings.readiness_level(readiness_level);
  return `${validate_component(Tabs_content, "Tabs.Content").$$render($$result, { value: `${type}` }, {}, {
    default: () => {
      return `<div class="flex flex-col gap-3">${each(questions, (question, index) => {
        return `<div class="flex gap-3"><input type="radio"${add_attribute("name", `${type}ReadinessLevel`, 0)} class="radio"${add_attribute("value", question.id, 0)} ${readiness_level.readiness_level === index + 1 ? "checked" : ""} disabled> <p>Level ${escape(question.level)}: ${escape(question.name)}</p></div> ${validate_component(Card, "Card.Root").$$render(
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
                              return `${validate_component(Table_head, "Table.Head").$$render($$result, { class: "text-center" }, {}, {
                                default: () => {
                                  return `Criteria`;
                                }
                              })} ${validate_component(Table_head, "Table.Head").$$render($$result, { class: "text-center" }, {}, {
                                default: () => {
                                  return `Excellent (5)`;
                                }
                              })} ${validate_component(Table_head, "Table.Head").$$render($$result, { class: "text-center" }, {}, {
                                default: () => {
                                  return `Good (4)`;
                                }
                              })} ${validate_component(Table_head, "Table.Head").$$render($$result, { class: "text-center" }, {}, {
                                default: () => {
                                  return `Fair (3)`;
                                }
                              })} ${validate_component(Table_head, "Table.Head").$$render($$result, { class: "text-center" }, {}, {
                                default: () => {
                                  return `Poor (2)`;
                                }
                              })} ${validate_component(Table_head, "Table.Head").$$render($$result, { class: "text-center" }, {}, {
                                default: () => {
                                  return `Very Poor (1)`;
                                }
                              })} ${validate_component(Table_head, "Table.Head").$$render($$result, { class: "text-center" }, {}, {
                                default: () => {
                                  return `Remark`;
                                }
                              })} `;
                            }
                          })} `;
                        }
                      })} ${validate_component(Table_body, "Table.Body").$$render($$result, {}, {}, {
                        default: () => {
                          return `${each(question.level_criteria, (criteria, i) => {
                            return `${validate_component(Table_row, "Table.Row").$$render($$result, { class: "h-[50px]" }, {}, {
                              default: () => {
                                return `<input type="hidden"${add_attribute("name", `${type}Criteria${question.level}${i + 1}`, 0)}${add_attribute("value", `${criteria.id}`, 0)}> ${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                                  default: () => {
                                    return `${escape(criteria.criteria)}`;
                                  }
                                })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, { class: "text-center" }, {}, {
                                  default: () => {
                                    return `<input type="radio"${add_attribute("name", `${type}${question.level}${i + 1}`, 0)} value="5" disabled ${scores[index * 6 + i].score === 5 ? "checked" : ""}>`;
                                  }
                                })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, { class: "text-center" }, {}, {
                                  default: () => {
                                    return `<input type="radio"${add_attribute("name", `${type}${question.level}${i + 1}`, 0)} value="4"${add_attribute("data-tip", criteria.good_description, 0)} disabled ${scores[index * 6 + i].score === 4 ? "checked" : ""}>`;
                                  }
                                })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, { class: "text-center" }, {}, {
                                  default: () => {
                                    return `<input type="radio"${add_attribute("name", `${type}${question.level}${i + 1}`, 0)} value="3"${add_attribute("data-tip", criteria.fair_description, 0)} disabled ${scores[index * 6 + i].score === 3 ? "checked" : ""}>`;
                                  }
                                })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, { class: "text-center" }, {}, {
                                  default: () => {
                                    return `<input type="radio"${add_attribute("name", `${type}${question.level}${i + 1}`, 0)} value="2"${add_attribute("data-tip", criteria.poor_description, 0)} disabled ${scores[index * 6 + i].score === 2 ? "checked" : ""}>`;
                                  }
                                })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, { class: "text-center" }, {}, {
                                  default: () => {
                                    return `<input type="radio"${add_attribute("name", `${type}${question.level}${i + 1}`, 0)} value="1" class="radio tooltip"${add_attribute("data-tip", criteria.very_poor_description, 0)} disabled ${scores[index * 6 + i].score === 1 ? "checked" : ""}>`;
                                  }
                                })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, { class: "text-center" }, {}, {
                                  default: () => {
                                    return `<textarea${add_attribute("name", `${type}Remark${question.level}${i + 1}`, 0)} class="textarea h-10 max-w-full" disabled>${escape(`${scores[index * 6 + i].remark}`, false)}</textarea> `;
                                  }
                                })} `;
                              }
                            })}`;
                          })} `;
                        }
                      })} `;
                    }
                  })} `;
                }
              })} `;
            }
          }
        )}`;
      })}</div>`;
    }
  })}`;
});
export {
  ReadOnlyRubrics as R,
  Rubrics as a
};
