import * as React from 'react';
// import styles from './Tarea4.module.scss';
import GruposCards from './GruposCards/GruposCards';
import CreateGrupo from './CreateGroup/CreateGroup';
import EditGrupo from './EditGrupo/EditGrupo';

import { ITarea4Props } from '../models/Interfaces';

import { HashRouter as Router, Route, Routes } from "react-router-dom";

export const SPContext = React.createContext(null)

const Tarea4 = (props: ITarea4Props) => {
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