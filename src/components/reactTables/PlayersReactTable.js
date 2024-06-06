import React,{useState, useEffect, useRef } from 'react';
import { useTable, useGlobalFilter} from 'react-table'
import PlayerService from '../../services/PlayerService';
import pic from "../images/VolleyballPlayer.png";
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as GiIcons from 'react-icons/gi';
import { GlobalFilter } from '../GlobalFilter';
import ReactToPrint from 'react-to-print';
import {useNavigate} from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { FaVolleyball } from "react-icons/fa6";
const PlayersReactTable=()=>{ 
  let componentRef = useRef(); 
  const navigate=useNavigate();
  const [data,setPlayers]=useState([]);
  const [loading,setLoading] = useState(false);
  useEffect(()=>{
    async function fetchData() {
      setLoading(true);
      await PlayerService.getPlayersBySchool(localStorage.school).then((response) => {           
          setPlayers(response.data);
      });
      setLoading(false);  
    }
    fetchData();  
      

  },[]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Division',
        accessor: 'division',        
      },
     
      {
        Header: 'Player ID',
        Cell: tableProps => (
          <div>  
            <img  src= {pic} style={{ width: 30, height:30, marginBottom: 5 }} className = 'player1' />
    
            {tableProps.row.original.playerID}  
          </div> 
        ),
        accessor: 'playerID', 
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Ranking',
        accessor: 'ranking', 
      },
      {
        Header: 'Wins',
        Cell: tableProps => (
          <div style={{ color: "green" }}> {tableProps.row.original.wins} 
          </div> 
        ),
        accessor: 'wins',
      },
      {
        Header: 'Losses',
        Cell: tableProps => (
          <div style={{ color: "red" }}> {tableProps.row.original.losses} 
          </div> 
        ),
        accessor: 'losses', 
      },
     
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data  },useGlobalFilter)

  const {globalFilter} = state
  return (
    <div>
        <br/>
        <div style={{ float: "right"}}>           
            <button type="button" className = "btn btn-primary mb-2" onClick={()=>{navigate('/add-player')}}  style={{marginRight: 10}}> <AiIcons.AiOutlineUser style={{ width: 20,height:20,marginRight: 5, marginBottom:4}}/>Add Players </button>
            <button type="button" className = "btn btn-primary mb-2 " onClick={()=>{navigate('/add-match-data-form')}} style={{marginRight: 10}}><FaVolleyball style={{ width: 20,height:20,marginRight: 5, marginBottom:3}}/>Add Match Results</button>
             <ReactToPrint
                trigger={()=>{
                    return  <button type="button" className = "btn btn-primary mb-2" style={{marginRight: 10}}>  <BsIcons.BsPrinter  style={{ width: 20,height:20,marginRight: 5}}/>  Print</button>
                }}
                content = {()=> componentRef}
                documentTitle = {localStorage.school}
                pageStyle = "print"
                className = "print"
              />
        </div>
        <GlobalFilter filter = {globalFilter} setFilter = {setGlobalFilter} />
        <div  ref={(e1) => (componentRef = e1)} style={{ maxWidth: '99.9%' }}> 
            <table {...getTableProps()} className = "table table-striped" style ={{height:20}}>
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps()} style = {{background: 'white'}}> {column.render('Header')} </th>
                    ))}
                  </tr>
                ))}
              </thead>
               {loading?
                <div style={{marginBottom:0}}>                    
                    <ClipLoader
                        color={"#0d6efd"}
                        loading={loading}        
                        size = {50}
    
                        cssOverride={{marginLeft:'300%',marginRight:'auto',marginTop:'20%'}}          
                    />
                </div>
                :
                <></>    
            }
              
              <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map(cell => {
                        return (
                          <td {...cell.getCellProps()}> {cell.render('Cell')} </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
        </div>
      {//</TableScrollbar>
}
    </div>
  )
}
export default PlayersReactTable;