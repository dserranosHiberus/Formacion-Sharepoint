import * as React from 'react';
// import styles from './Tarea4.module.scss';
import GruposCards from './ReadGroups';
import CreateGrupo from './CreateGroup';
import EditGrupo from './EditGrupo';

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { DisplayMode } from '@microsoft/sp-core-library';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export const SPContext = React.createContext(null)

const Tarea4 = (props: {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;
  title: string;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
}) => {
  const value = { context: props.context }
  return (
    <>
      <SPContext.Provider value={value}>
        <Router>
          <Routes>
            <Route path="/" element={<GruposCards />} />
            <Route path="/editGroup/:groupId" element={<EditGrupo />} />
            <Route path="/createGroup/" element={<CreateGrupo />} />
          </Routes>
        </Router>
      </SPContext.Provider>
    </>
  )
}
export default Tarea4