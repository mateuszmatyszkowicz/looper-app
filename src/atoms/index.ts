import { atom } from "recoil";
import { LayoutElement, Ticket, TicketDictorinary } from "../types";

export const appState = atom({
  key: "app-state",
  default: {
    layout: [
      { i: "c", x: 1, y: 2, w: Infinity, h: 1, collapsed: true },
      { i: "b", x: 2, y: 1, w: Infinity, h: 1, collapsed: false },
      { i: "d", x: 2, y: 3, w: Infinity, h: 1, collapsed: false },

    ] as LayoutElement[],
    tickets: {
      b: Ticket("adasdasdasd"),
      c: Ticket("adadsf3433245"),
    } as TicketDictorinary,
  },
});
