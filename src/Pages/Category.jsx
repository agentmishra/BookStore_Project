import React, { useEffect } from 'react';
import '../css/header.css';
import '../css/product.css';
import categoryService from '../service/category.service';
import { toast } from 'react-toastify';
import { Typography } from "@mui/material";
import { useState } from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from "@mui/material/TablePagination";
import Paper from '@mui/material/Paper';
import Confirm from '../Components/Confirm';
import { useNavigate } from 'react-router-dom';

const Category = () => {
  // initial filter while page is rendering
  const defaultFilter = {
    pageIndex: 1,
    pageSize: 10,
  };

  // set Book Records:In this pageIndex,pageSize,totalPages is for the navigation purpose
  // and items array is used for add Book records in page
  const [categoryRecords, setCategoryRecords] = useState({
    pageIndex: 0,
    pageSize: 10,
    totalPages: 1,
    items: [],
    totalItems: 0,
  });

//   const [categories, setCategories] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [filters, setFilters] = useState(defaultFilter);
  const [open, setOpen] = useState(false);
  const Navigate = useNavigate();
  const columns = [
    { id: "id", label: "ID", width: 70},
    { id: "name", label: "Category Name", width: 80 },
  ];
  const searchAllCategories = (filters) => {
    categoryService.getAll(filters).then((res) => {
      setCategoryRecords(res);
    });

  };
  useEffect(() => {
    searchAllCategories({ ...filters });
  }, [filters]);
  const onConfirmDelete = () => {
    categoryService
      .deleteCategory(selectedId)
      .then((res) => {
        toast.success("Category Deleted Successfully...");
        setOpen(false);
        setFilters({ ...filters});
      });

  };

  return (<>
    <div>
      <div className='center'>
        <div className="loginheader">Category</div>
        <hr color="red" width='15%' />
      </div>
    </div>
    <div style={{ marginBottom: '45px' }}></div>
    <div className='searchContainer'>
      <input type='search'
       placeholder='search'
        className='productSearch'
        onChange={(e) => {
              setFilters({ ...filters, keyword: e.target.value, pageIndex: 1 });
            }}></input>
      <button type='submit' className='productbtn' onClick={() => Navigate('/add-category')}>Add Category</button>
    </div>
    <div style={{ marginBottom: '32px' }}></div>
    <div style={{ margin: 'auto', width: '50%' }}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.width }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoryRecords?.items?.map((row, index) => {
              return (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      sx={{width:'100px'}}
                      color='success'
                      variant="outlined"
                      disableElevation
                      onClick={() => {
                        Navigate(`/edit-category/${row.id}`);
                      }}
                    >
                      Edit
                    </Button>
                    <span style={{ marginRight: '20px' }}></span>
                    <Button
                      type="button"
                      variant="outlined"
                      disableElevation
                      onClick={() => {
                        setOpen(true);
                        setSelectedId(row.id ?? 0);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>);
            }
            )
            }
            {!categoryRecords.items.length && (
              <TableRow >
                <TableCell colSpan={5}>
                  <Typography align="center" className="noDataText">
                    No any Categories Available.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 5, 10, 100]}
        component="div"
        count={categoryRecords.totalItems}
        rowsPerPage={filters.pageSize || 0}
        page={filters.pageIndex - 1}
        onPageChange={(e, newPage) => {
          setFilters({ ...filters, pageIndex: newPage + 1 });
        }}
        onRowsPerPageChange={(e) => {
          setFilters({
            ...filters,
            pageIndex: 1,
            pageSize: Number(e.target.value),
          });
        }}
      />
      <Confirm
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onConfirmDelete()}
        title="Delete Category"
        description="Are you sure you want to delete this Category?"
      />
    </div>

  </>
  );

}
export default Category;