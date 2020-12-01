import { Layout } from "react-grid-layout";
import { atom } from "recoil";
import { Ticket, TicketDictorinary } from "../types";

export const appState = atom({
  key: "app-state",
  default: {
    layout: [
      {
        i: "c",
        x: 1,
        y: 2,
        w: Infinity,
        h: 1,
      },
      {
        i: "b",
        x: 2,
        y: 1,
        w: Infinity,
        h: 1,
      },
      {
        i: "d",
        x: 2,
        y: 3,
        w: Infinity,
        h: 1,
      },
    ] as Layout[],
    tickets: {
      b: Ticket("adasdasdasd"),
      c: Ticket("adadsf3433245"),
    } as TicketDictorinary,
  },
});
