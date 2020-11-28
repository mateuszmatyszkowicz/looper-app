import React, { useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Client } from "jira.js";
import "../node_modules/react-grid-layout/css/styles.css";
import "../node_modules/react-resizable/css/styles.css";
import MyFirstGrid from "./data-grid";
import TestingPage from "./TestingPage";

const JIRA_API_TOKEN = "BArK8yCqQhHuYbuqova6F0D4";
const JIRA_HOST = "https://employeesgate.atlassian.net";

function App() {
  const client = useRef(
    new Client({
      host: JIRA_HOST,
      authentication: {
        accessToken: JIRA_API_TOKEN,
      },
    })
  );

  useEffect(() => {
    // async function jiraCall() {
    //   await client.current.board.getBoard({boardId: 10305});
    //   await client.current.projects.getAllProjects();
    // }
    // jiraCall();
  }, []);

  return (
    <div className="App">
      {/* <MyFirstGrid /> */}
      <TestingPage />
    </div>
  );
}

export default App;
