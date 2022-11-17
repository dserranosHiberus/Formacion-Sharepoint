import * as React from 'react';
// import styles from './Tarea4.module.scss';
import GruposCards from './GruposCards/GruposCards';
import EditGrupo from './EditGrupo/EditGrupo';
import { ITarea4Props } from '../models/Interfaces';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Tarea4 = (props: ITarea4Props) => {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/_layouts/15/workbench.aspx/" element={<GruposCards />} />
          <Route path="/_layouts/15/workbench.aspx/editGroup/:groupId" element={<EditGrupo />} />
        </Routes>
      </Router>

    </>
  )
}
export default Tarea4