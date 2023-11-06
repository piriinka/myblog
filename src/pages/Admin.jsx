import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { NotFound } from './NotFound';
import { useState } from 'react';
import { useEffect } from 'react';
import './Admin.css'
import { deleteSelectedPosts, readPostsRows } from '../utility/crudUtility';
import { Loader } from '../components/Loader';


const columns = [
  { field: 'id', headerName: 'post ID', width: 180 },
  {
    field: 'title',
    headerName: 'title',
    width: 150,
   /* editable: true,*/
  },
  {
    field: 'author',
    headerName: 'author',
    width: 80,
   /* editable: true,*/
},
  {
    field: 'userId',
    headerName: 'author ID',
    width: 240,
   /* editable: true,*/
},
  /*{
    field: 'userID',
    headerName: 'author ID',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },*/
];


export const Admin=()=> {
    const [rows, setRows]=useState([])
    const [selection, setSelection]=useState([])
    const [loading, setLoading]=useState(false)

    useEffect(()=>{
        readPostsRows(setRows)
    },[])

    const {role} =useContext(UserContext)
    if( role != 'admin')
    return <NotFound/>

    console.log(selection)

    const handleDelete =async ()=>{
        setLoading(true)
        await deleteSelectedPosts(selection)
        setLoading(false)
    }

  return (
    <div className="container">
     <Box sx={{ height: 400, width: '100%' }}>
      {rows && <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(id)=>setSelection(id)}
      />}
    </Box>
    <button className='btn btn' onClick={handleDelete}>Delete selected post</button>
    {loading && <Loader/>}
    </div>
   
  );
}
