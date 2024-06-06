import { useTable, useGlobalFilter, useSortBy } from 'react-table'
import React,{useState, useEffect} from 'react';
import {CSVLink} from 'react-csv';
import * as RiIcons from 'react-icons/ri';
import * as SiIcons from 'react-icons/si';
import { GlobalFilter } from '../GlobalFilter';
import SchoolService from '../../services/SchoolService';
import ClipLoader from "react-spinners/ClipLoader";
import UserService from '../../services/UserService';
import {useNavigate} from "react-router-dom";
import * as AiIcons from 'react-icons/ai';
import * as HiIcons from 'react-icons/hi'

const AllUsersReactTable=()=>{ 
  const [data,setUsers]=useState([]);
  const [loading,setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate=useNavigate();
  //const schoolImages = [];
  const [schoolImages, setSchoolImages] = useState([]);
 
  useEffect(()=>{
    async function fetchData() {
     
      setLoading(true);
      await SchoolService.getSchools().then((response) => {           
        for(var i = 0; i < response.data.length; i++) 
        {
                schoolImages.push({
                    name: response.data[i].name,
                    image: response.data[i].image,
                });
        }
      });

      await UserService.getUsers().then((response) => {           
        setUsers(response.data);
      });
      
      setLoading(false);  
      
    }
    fetchData();      
      

  },[]);


 async function deleteUser(username) {

    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (!confirmed) {
      return;
    }
    setLoading(true);
    try {
      await UserService.deleteUser(username);
      localStorage.message = "User " + username + ' Deleted Successfully';
    } catch (error) {
      console.log(error);
      setError('Failed to Delete Match');
    } finally {
      setLoading(false);
      window.location.reload(false);
    }
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
        Header: 'Email',
        accessor: 'username',        
      },
      {
        Header: 'Password',
        accessor: 'password',        
      },
      {
        Header: 'First Name',
        accessor: 'firstName',        
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',        
      },
      {
        Header: 'Phone Number',
        accessor: 'phoneNumber',        
      },
      {
        Header: 'Home Team',
        Cell: tableProps => (
            <div>     
              <img src={`data:image/jpeg;base64,${getImage(tableProps.row.original.homeTeam)}`}  style={{ width: 30, height:30,marginRight: 10 }} className = 'player1'/>        
                {tableProps.row.original.homeTeam}  
            </div> ),
          accessor: 'homeTeam',        
      },
      {
        Header: (localStorage.role === 'Admin' )? 'Action':' ',
        Cell: tableProps => (
        <div>
          {(localStorage.role === 'Admin' )? 
          <button onClick={(e)=>{ deleteUser(tableProps.row.original.username);}} className = "btn "  disabled = {loading}><RiIcons.RiDeleteBin6Line/></button>: 
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
  } = useTable({ columns, data  },useGlobalFilter,useSortBy)

  const {globalFilter} = state
  return (
    <div>
        <h1 className = "text-center"><HiIcons.HiOutlineUserCircle style={{ marginBottom: 8 ,marginRight: 7}}/>User Management</h1>
       
        <div style={{float:"right",paddingRight:10}}>
            <button 
              type="button" 
              className = "btn btn-primary mb-2" 
              onClick={()=>{navigate('/add-user')}}  
              disabled={schoolImages.length === 0}
              style={{marginRight: 10}}> 
              <AiIcons.AiOutlineUser style={{ width: 20,height:20,marginRight: 5, marginBottom: 6}}/>Add Users 
            </button>
          <CSVLink data = {data} filename = 'AllUsers'> <button type="button" className = "btn btn-primary mb-2">  <SiIcons.SiMicrosoftexcel  style={{ width: 20,height:20,marginRight: 5,marginBottom: 3}}/>Download</button> </CSVLink>
        </div>           
        <div className='rowC' >
              <GlobalFilter filter = {globalFilter} setFilter = {setGlobalFilter} />  
              <div style={{  width: 200, marginLeft: 10,borderRadius: 10,  borderColor: 'grey'}}>      
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
                  <th {...column.getHeaderProps()} style = {{background: 'white'}}> {column.render('Header')}
                    <span> 
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ''
                        : ''
                      : ''}
                    </span> 
                    </th>
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
                        cssOverride={{marginLeft:'205%',marginRight:'auto',marginTop:'20%'}}          
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
              })
              :
              <></>
          }
          </tbody>
        </table>
        </>
        </div>
      {//</TableScrollbar>
}
    </div>
  )
}
export default AllUsersReactTable;