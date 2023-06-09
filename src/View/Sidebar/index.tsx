import { useNavigate } from "react-router-dom";

function Sidebar({setviewside}:any) {
    // side nav page List
    const routes=[
        {
            // label that going to visible in front
            // route is nav location.
            label:'Contacts',
            key:'/'
        },
        {
            label:'Charts And Maps',
            key:'/charts'
        },
    ]
    // used foe navigate to other routes
    const navigate=useNavigate();
    return ( 
       <div className='sidepanel fixed z-40'  style={{height:"100vh", background:"#fff"}} >
                 <div className={`cross-icon fixed top-5 sidepanel-icon cursor-pointer`} onClick={()=>setviewside(false)}>
                        &#10005;
                 </div>
                 <div className={`pt-20 flex flex-col w-auto justify-between items-center`}>
                {routes.map((x,key)=>{return(
                    <div className={`mr-8 headsty  m-4 cursor-pointer`} key={key} onClick={()=>{navigate(x.key)}}>{x.label}</div>
                 )})}
                </div>
        </div>
     );
}

export default Sidebar;