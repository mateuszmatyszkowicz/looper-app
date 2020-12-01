import { Layout } from "react-grid-layout";

export const Ticket = (name: string) => ({
  name,
  author: "Author Name",
  startDate: new Date(),
  endDate: new Date(),
  dependencies: [],
  hasDependencies: function () {
    return !!this.dependencies.length;
  },
});

// eslint-disable-next-line
export interface Ticket extends ReturnType<typeof Ticket> {}

export type TicketDictorinary = Record<string, Ticket>;

export type LayoutElement = Layout & { collapsed: boolean; sublay: Layout[] };
