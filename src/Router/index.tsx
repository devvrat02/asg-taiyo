import {BrowserRouter, Route,Routes} from 'react-router-dom';
import Contacts from '../View/Contacts';
import Charts from '../View/Charts';
import Sidebar from '../View/Sidebar';
import { useState } from 'react';
import {ReactComponent as Nav} from '../View/images/nav.svg'

// routing page Navigation to other page
function Router() {
  // sidebar showing state
  const [viewside,setviewside]=useState(true)
    return ( 
    <BrowserRouter>
        <div className='flex'>
          <div className='fixed top-5 left-5 cursor-pointer' onClick={()=>{setviewside(true)}}>
            <Nav/>
          </div>
          <div>
            {viewside&&<Sidebar setviewside={setviewside} />}
          </div>
          <div className=' p-10 justify-center w-4/5 m-auto' style={{}}>
          <Routes>
            <Route path='/' element={
            <div className='flex flex-row p-10 justify-center items-center w-full'>
              <Contacts/>
            </div>}/>
            <Route path='/charts' element={<Charts/>}/>
          </Routes>
          </div>
        </div>
      </BrowserRouter>
     );
}

export default Router;