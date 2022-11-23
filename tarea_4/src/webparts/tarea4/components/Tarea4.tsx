import * as React from 'react';
// import styles from './Tarea4.module.scss';
import GruposCards from './GruposCards/GruposCards';
import CreateGrupo from './CreateGroup/CreateGroup';
import EditGrupo from './EditGrupo/EditGrupo';

import { ITarea4Props } from '../models/Interfaces';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export const SPContext = React.createContext(null)

const Tarea4 = (props: ITarea4Props) => {
  // console.log("Desde Tarea4", props.context)
  // const [contador, setContador] = React.useState<number>(1)
  // const aumentar = () => setContador(prev => prev + 1)
  // const value = { contador, aumentar, context: props.context }

  const value = { context: props.context }

  return (
    <>
      <SPContext.Provider value={value}>
        <Router>
          <Routes>
            <Route path="/_layouts/15/workbench.aspx/" element={<GruposCards />} />
            <Route path="/_layouts/15/workbench.aspx/editGroup/:groupId" element={<EditGrupo />} />
            <Route path="/_layouts/15/workbench.aspx/createGroup/" element={<CreateGrupo />} />
          </Routes>
        </Router>
      </SPContext.Provider>
    </>
  )
}
export default Tarea4