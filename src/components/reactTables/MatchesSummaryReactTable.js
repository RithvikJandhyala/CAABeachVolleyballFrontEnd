import { useTable, useGlobalFilter } from 'react-table'
import React,{useState, useEffect} from 'react';
import MatchService from '../../services/MatchService';
import {CSVLink} from 'react-csv';
import win from "../images/check.png";
import * as SiIcons from 'react-icons/si';
import * as RiIcons from 'react-icons/ri';
import { FaChessKing } from "react-icons/fa";
import { GlobalFilter } from '../GlobalFilter';
import SchoolService from '../../services/SchoolService';
import ClipLoader from "react-spinners/ClipLoader";
import Select from 'react-select';
import { TbPlayVolleyball } from "react-icons/tb";

const divisions = [
  { value: 'All Divisions', label: 'All Divisions' },
  { value: "JH Boys", label: 'JH Boys' },
  { value: "JH Girls", label: 'JH Girls' },
  { value: "HS Boys", label: 'HS Boys' },
  { value: "HS Girls", label: 'HS Girls' },
]

const MatchesSummaryReactTable=()=>{ 
  const [data,setMatchesDaySummary]=useState([]);
  const [loading,setLoading] = useState(false);
  const [error, setError] = useState("");
  const schoolImages = [];

  useEffect(()=>{
    async function fetchData() {
      setLoading(true);
      await  SchoolService.getSchools().then((response) => {           
        for(var i = 0; i < response.data.length; i++) 
        {
                schoolImages.push({
                    name: response.data[i].name,
                    image: response.data[i].image,
                });            
        }
      });
      await MatchService.getMatchesDaySummary().then((response) => {           
        setMatchesDaySummary(response.data);
      });
      setLoading(false);  
    }
    fetchData();   
  },[]);

  async function deleteMatchSummary(id) {
    const confirmed = window.confirm('Are you sure you want to delete this match summary?');
    if (!confirmed) {
      return;
    }
    setLoading(true);
    try {
      await MatchService.deleteMatchSummary(id);
      localStorage.message = "Match Summary " + id + ' Deleted Successfully';
    } catch (error) {
      console.log(error);
      setError('Failed to Delete Match');
    } finally {
      setLoading(false);
      window.location.reload(false);
    }
  }

  async function fetchDataByDivision(division) {     
    setLoading(true);
    //await sleep(2000);
    await MatchService.getMatchesDaySummaryByDivision(division).then((response) => {           
      setMatchesDaySummary(response.data);
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

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',        
      },
        {
            Header: 'Match Date',
            accessor: 'matchDate',        
          },
          {
            Header: 'Division',
            accessor: 'division',        
          },
          {
            Header: 'Home Team',
            accessor: 'homeTeam',
            Cell: tableProps => (
              <div>
                <div>             
                   
                    <img src={`data:image/jpeg;base64,${getImage(tableProps.row.original.homeTeam)}`}  style={{ width: 30, height:30,marginRight: 10 }} className = 'player1'/>
                    {tableProps.row.original.homeTeam}
                    {(tableProps.row.original.homeTeamPoints > tableProps.row.original.awayTeamPoints )?
                    <img  src= {win} style={{ width: 15, height:15,marginLeft:7 }} className = 'player1' />:
                    <></>
                  }  
                </div>
              </div> ),             
          },
          {
            Header: 'Home Team Points',
            accessor: 'homeTeamPoints',
          },
          {
            Header: 'Away Team',
            accessor: 'awayTeam',
            Cell: tableProps => (
                <div>             
                  
                    
                    <img src={`data:image/jpeg;base64,${getImage(tableProps.row.original.awayTeam)}`}  style={{ width: 30, height:30,marginRight: 10 }} className = 'player1'/>{tableProps.row.original.awayTeam}
                    {(tableProps.row.original.awayTeamPoints > tableProps.row.original.homeTeamPoints )?
                    <img  src= {win} style={{ width: 15, height:15,marginLeft:7 }} className = 'player1' />:
                    <></>
                  }  
                </div> ),              
          },
          {
            Header: 'Away Team Points',
            accessor: 'awayTeamPoints',     
          },
          {
            Header: (localStorage.role === 'Admin' )? 'Action':' ',
            Cell: tableProps => (
              <div>
                {(localStorage.role === 'Admin' )? 
                <button onClick={(e)=>{ deleteMatchSummary(tableProps.row.original.id);}} className = "btn"  disabled = {loading}><RiIcons.RiDeleteBin6Line/></button>: 
                <></>}             
                          
              </div> ),      
          }
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
         <h1 className = "text-center"><TbPlayVolleyball style={{ marginBottom: 10 ,marginRight: 5}}/>Matches Summary</h1>
         <div style={{float:"right",paddingRight:10}}>
          <CSVLink data = {data} filename = 'AllTeamMatches'> <button type="button" className = "btn btn-primary mb-2">  <SiIcons.SiMicrosoftexcel  style={{ width: 20,height:20,marginRight: 5,marginBottom: 3}}/>Download</button> </CSVLink>
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
                        cssOverride={{marginLeft:'320%',marginRight:'auto',marginTop:'20%'}}          
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
export default MatchesSummaryReactTable;