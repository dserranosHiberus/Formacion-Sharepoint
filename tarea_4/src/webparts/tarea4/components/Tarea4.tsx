import * as React from 'react';
// import styles from './Tarea4.module.scss';
import GruposCards from './GruposCards/GruposCards';
import { ITarea4Props } from '../models/Interfaces';
import { IGrupos } from '../models/Interfaces';
import { getGruposInfo } from '../services/DAOService';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from 'react-router-dom'

const Tarea4 = (props: ITarea4Props) => {
  const context = props.context
  const [groupList, setGroupList] = React.useState<IGrupos[]>([])

  React.useEffect(() => {
    const getGrupos = async () => {
      const responseGroups = await getGruposInfo()
      console.log(responseGroups)
      setGroupList(responseGroups)
    }
    getGrupos();
  }, [])

  return (
    <>
      <Router>
        <Routes>
          <Route path="/gruposCards" element={<GruposCards />} ></Route>
          {/* <Route path="/editGroup/:groupId" element={<EditGrupo />} ></Route> */}
        </Routes>

        <button >
          <Link to={'/gruposCards'}>Lista de Grupos</Link>
        </button>
      </Router>
    </>
  )
}

export default Tarea4