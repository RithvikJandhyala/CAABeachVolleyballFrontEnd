import { useTable, useGlobalFilter } from 'react-table'
import React,{useState, useEffect} from 'react';
import MatchService from '../../services/MatchService';
import {CSVLink} from 'react-csv';
import * as BsIcons from 'react-icons/bs';
import * as SiIcons from 'react-icons/si';
import { IoMdRefresh } from "react-icons/io";
import { GlobalFilter } from '../GlobalFilter';
import SchoolService from '../../services/SchoolService';
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClipLoader from "react-spinners/ClipLoader";
import Select from 'react-select';
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
const divisions = [
  { value: 'All Divisions', label: 'All Divisions' },
  { value: "JH Boys", label: 'JH Boys' },
  { value: "JH Girls", label: 'JH Girls' },
  { value: "HS Boys", label: 'HS Boys' },
  { value: "HS Girls", label: 'HS Girls' },
]


const TeamStandingReactTable=()=>{ 
    const [data,setTeamStandings]=useState([]);
    const [loading,setLoading] = useState(false);
    const schoolImages = [];
    const [error, setError] = useState("");
 
  useEffect(()=>{
    async function fetchData() {
      setLoading(true);
      await SchoolService.getSchools().then((response) => {           
        for(var i = 0; i < response.data.length; i++) 
        {
                {schoolImages.push({
                    name: response.data[i].name,
                    image: response.data[i].image,
                });
            }
        }
      });
      await MatchService.getTeamStanding().then((response) => {           
        setTeamStandings(response.data);
      });
      setLoading(false);  
    }
    fetchData();    
  },[]);

  async function fetchDataByDivision(division) {     
    setLoading(true);
    await MatchService.getTeamStandingByDivision(division).then((response) => {           
      setTeamStandings(response.data);
    });
    setLoading(false);  
  }
  const getImage = (schoolName) => {    
    const foundSchool = schoolImages.find(school => schoolName === school.name);
    if (foundSchool) {
      console.log("True:", schoolName, foundSchool.name);
      return foundSchool.image;
    }    
    return null;
  };
  async function resetSeason() {

    const confirmed1 = window.confirm('ARE YOU SURE YOU WANT TO RESET THE SEASON? PLEASE MAKE SURE YOU HAVE DOWNLOADED ALL THE INFORMATION FROM EACH SCREEN');
    if (!confirmed1) {
      return;
    }
    const confirmed2 = window.confirm('THIS IS AN IRREVERSABLE ACTION. ARE YOU SURE YOU WOULD LIKE TO CONTINUE?');
    if (!confirmed1) {
      return;
    }
    setLoading(true);
    try {
      await MatchService.resetSeason();
      localStorage.message = "Season Reset Successfully";
           //navigate('/matches-summary');
    } catch (error) {
      console.log(error);
      setError('Failed to Delete Match');
    } finally {
      setLoading(false);
      window.location.reload(false);
    }
  }
  

  const columns = React.useMemo(
    () => [
          {
            Header: 'Division',
            accessor: 'division',        
          },
          {
            Header: 'Team',
            accessor: 'name',
            Cell: tableProps => (
                <div>      
                       <img src={`data:image/jpeg;base64,${getImage(tableProps.row.original.name)}`}  style={{ width: 30, height:30,marginRight: 10 }} className = 'player1'/>
                    {tableProps.row.original.name}  
                </div> ),               
          },
          {
            Header: 'Wins',
            accessor: 'wins',
            Cell: tableProps => (
                <div style={{ color: "green" }}> {tableProps.row.original.wins} 
                </div> 
              ),        
          },
          {
            Header: 'Losses',
            accessor: 'losses',
            Cell: tableProps => (
                <div style={{ color: "red" }}> {tableProps.row.original.losses} 
                </div> 
              ),        
          },
          {
            Header: 'Ties',
            accessor: 'ties',        
          },
          {
            Header: 'Win %    ',
            Cell: tableProps => (
              <div className="progressBar" >
                <ProgressBar animated value={25} now={tableProps.row.original.pct.toFixed(1)} label={`${tableProps.row.original.pct.toFixed(1)}% `} />
              </div>
            ),
            accessor: 'pct',        
          },
          {
            Header: 'Points Won',
            accessor: 'winPoints',
            Cell: tableProps => (
                <div style={{ color: "green" }}> {tableProps.row.original.winPoints} 
                </div> 
              ),        
          },
          {
            Header: 'Points Lost',
            accessor: 'lossPoints',
            Cell: tableProps => (
                <div style={{ color: "red" }}> {tableProps.row.original.lossPoints} 
                </div> 
              ),               
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
         <h1 className = "text-center"><BsIcons.BsTrophy style={{ marginBottom: 10 ,marginRight: 5}}/>Team Standings</h1>
         <div style={{float:"right",paddingRight:10}}>
          <CSVLink data = {data} filename = 'Team Standings'> <button type="button" className = "btn btn-primary mb-2" style={{marginRight: 10}}>  <SiIcons.SiMicrosoftexcel  style={{ width: 20,height:20,marginRight: 5,marginBottom: 3}}/>Download</button> </CSVLink>
          {(localStorage.role == "Admin")? <button type="button" className = "btn btn-primary mb-2" onClick={()=>{resetSeason()}}  style={{marginRight: 10}}> <IoMdRefresh style={{ width: 20,height:20,marginRight: 0, marginBottom:3}}/> Reset Season </button>         : <></>}
        </div>   
        <div className='rowC' >
              <GlobalFilter filter = {globalFilter} setFilter = {setGlobalFilter} />  
              <div style={{  width: 200, marginLeft: 10,borderRadius: 10,  borderColor: 'grey'}}>      
              <Select style={{ width: 500,  borderRadius: 50}}
                  value={divisions.value}                                           
                  isSearchable={false}
                  onChange = {(e) =>{ fetchDataByDivision(e.label);  }} 
                  options={divisions}
                  defaultValue={divisions[0]}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderRadius: "20px"
                    })
                  }}                  
              />         
              </div>                            
        </div> 
       {// <TableScrollbar height = "70vh"  style={{ marginBottom: 10 ,marginRight: 5,border:'1px solid'}}>
        }
        <div style={{ maxWidth: '99.9%' }}>
          <>
          
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
                        cssOverride={{marginLeft:'360%',marginRight:'auto',marginTop:'20%'}}          
                    />
                </div>
                :
                <></>
          }
         
          <tbody {...getTableBodyProps()}>
            {
             (!loading)?

              
            rows.map(row => {
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
            }):
            <></>
            
            
            }
          </tbody>
        </table>
        </>
        </div>

    </div>
  )
}
export default TeamStandingReactTable;