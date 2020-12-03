import React, { useEffect, useState } from "react";
import "./App.css";
// import { Client } from "jira.js";
import "../node_modules/react-grid-layout/css/styles.css";
import "../node_modules/react-resizable/css/styles.css";
// import MyFirstGrid from "./data-grid";
import Board from "./components/board.component";
import Button from "./components/button";
import CreateTicketModal from "./components/create-ticket.componen";
import { useLocalStorage } from "./core/use-local-storage.hook";
import {
  useRecoilState,
  useRecoilTransactionObserver_UNSTABLE,
  useSetRecoilState,
} from "recoil";
import { appState } from "./atoms";
// import { Ticket } from "./types";

// const JIRA_API_TOKEN = "BArK8yCqQhHuYbuqova6F0D4";
// const JIRA_HOST = "https://employeesgate.atlassian.net";

function App() {
  const [state, setState] = useLocalStorage("app-state", {
    layout: [],
    nestedLayouts: {},
    tickets: {},
  });
  const [appstate, setAppState] = useRecoilState(appState);

  useEffect(() => {
    setAppState(state);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setState(appstate);
    // eslint-disable-next-line
  }, [appstate]);

  // const client = useRef(
  //   new Client({
  //     host: JIRA_HOST,
  //     authentication: {
  //       accessToken: JIRA_API_TOKEN,
  //     },
  //   })
  // );

  // useEffect(() => {
  // async function jiraCall() {
  //   await client.current.board.getBoard({boardId: 10305});
  //   await client.current.projects.getAllProjects();
  // }
  // jiraCall();
  // }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="App">
      {/* <MyFirstGrid /> */}
      <Board />
      <CreateTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <Button onClick={() => setIsModalOpen(true)} />
    </div>
  );
}

export default App;
