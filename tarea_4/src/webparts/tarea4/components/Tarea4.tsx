import * as React from 'react';
// import styles from './Tarea4.module.scss';
import GruposCards from './GruposCards/GruposCards';
import CreateGrupo from './CreateGroup/CreateGroup';
import EditGrupo from './EditGrupo/EditGrupo';

import { ITarea4Props } from '../models/Interfaces';

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { WebPartContext } from '@microsoft/sp-webpart-base';

const SPContext = React.createContext(null)
export const useSPContext = (): WebPartContext => React.useContext(SPContext);


// console.log("Desde Tarea4", props.context)
// const [contador, setContador] = React.useState<number>(1)
// const aumentar = () => setContador(prev => prev + 1)
// const value = { contador, aumentar, context: props.context }
//o tambien vale => const value = { context: props.context }


export default function Tarea4({
  context,
}: ITarea4Props): React.ReactElement {
  return (
    <SPContext.Provider value={context}>
      <Router>
        <Routes>
          <Route path="/" element={<GruposCards />} />
          <Route path="/editGroup/:groupId" element={<EditGrupo />} />
          <Route path="/createGroup/" element={<CreateGrupo />} />
        </Routes>
      </Router>
    </SPContext.Provider>
  )
}