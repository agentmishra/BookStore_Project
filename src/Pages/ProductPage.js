import React, { useEffect } from 'react';
import '../css/header.css';
import '../css/product.css';
import bookService from '../service/book.service';
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

const ProductPage = () => {
  // initial filter while page is rendering
  const defaultFilter = {
    pageIndex: 1,
    pageSize: 10,
  };

  // set Book Records:In this pageIndex,pageSize,totalPages is for the navigation purpose
  // and items array is used for add Book records in page
  const [bookRecords, setBookRecords] = useState({
    pageIndex: 0,
    pageSize: 10,
    totalPages: 1,
    items: [],
    totalItems: 0,
  });

  const [categories, setCategories] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [filters, setFilters] = useState(defaultFilter);
  const [open, setOpen] = useState(false);
  const Navigate = useNavigate();
  const columns = [
    { id: "id", label: "ID", width: 70 },
    { id: "name", label: "Book Name", width: 70 },
    { id: "price", label: "Price", width: 70 },
    { id: "category", label: "Category", width: 70 },
  ];
  // Rendering all Categories of the Book
  useEffect(() => {
    categoryService.getAll().then((res) => {
      if (res) {
        setCategories(res);
      }
    });

  }, []);
  const searchAllBooks = (filters) => {
    bookService.getAll(filters).then((res) => {
      setBookRecords(res);
    });

  };
  useEffect(() => {
    searchAllBooks({ ...filters });
  }, [filters]);
  const onConfirmDelete = () => {
    bookService
      .deleteBook(selectedId)
      .then((res) => {
        toast.success("Record Deleted Successfully...");
        setOpen(false);
        setFilters({ ...filters});
      });

  };

  return (<>
    <div>
      <div className='center'>
        <div className="loginheader">Product Page</div>
        <hr color="red" width='15%' />
      </div>
    </div>
    <div style={{ marginBottom: '45px' }}></div>
    <div className='searchContainer'>
      <input type='search' placeholder='search' className='productSearch'></input>
      <button type='submit' className='productbtn' onClick={() => Navigate('/add-book')}>Add Product</button>
    </div>
    <div style={{ marginBottom: '32px' }}></div>
    <div style={{ margin: 'auto', width: '80%' }}>
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
            {bookRecords?.items?.map((row, index) => {
              return (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>
                    {categories.find((c) => c.id === row.categoryId)?.name}
                  </TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      className="green-btn btn"
                      color='success'
                      variant="outlined"
                      disableElevation
                      onClick={() => {
                        Navigate('/edit-book');
                      }}
                    >
                      Edit
                    </Button>
                    <span style={{ marginRight: '20px' }}></span>
                    <Button
                      type="button"
                      className="btn pink-btn"
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
            {!bookRecords.items.length && (
              <TableRow >
                <TableCell colSpan={5}>
                  <Typography align="center" className="noDataText">
                    No Books
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
        count={bookRecords.totalItems}
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
        title="Delete book"
        description="Are you sure you want to delete this book?"
      />
    </div>

  </>
  );

}
export default ProductPage;