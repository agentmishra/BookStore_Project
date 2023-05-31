import React from 'react';
import '../css/header.css';
import '../css/product.css';
import bookService from '../service/book.service';
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
import { useNavigate } from 'react-router-dom';

const ProductPage=()=>{
    const [bookRecords, setBookRecords] = useState({
        pageIndex: 0,
        pageSize: 10,
        totalPages: 1,
        items: [],
        totalItems: 0,
      });
      const searchAllBooks = (props) => {
        bookService.getAll(props).then((res) => {
          setBookRecords(res);
        });
      };
      const Navigate=useNavigate();
      const columns = [
        {id:"id",label:"ID",width:100},
        { id: "name", label: "Book Name", width: 100 },
        { id: "price", label: "Price", width: 100 },
        { id: "category", label: "Category", width: 100 },
      ];
    return(<>
    <div>
          <div className='center'>
            <div className="loginheader">Product Page</div>
            <hr color="red" width='15%' />
          </div>
    </div>
    <div style={{marginBottom:'45px'}}></div>
    <div className='searchContainer'>
        <input type='search' placeholder='search' className='productSearch'></input>
        <button type='submit' className='productbtn' onClick={()=>Navigate('/edit')}>Add Product</button>
    </div>
    <div style={{marginBottom:'32px'}}></div>
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
              {bookRecords?.items?.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  {/* <TableCell>
                    {categories.find((c) => c.id === row.categoryId)?.name}
                  </TableCell> */}
                  <TableCell>
                    <Button
                      type="button"
                      className="green-btn btn"
                      variant="contained"
                      color="primary"
                      disableElevation
                    //   onClick={() => {
                    //     navigate(`/edit-book/${row.id}`);
                    //   }}
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      className="btn pink-btn"
                      variant="contained"
                      color="primary"
                      disableElevation
                    //   onClick={() => {
                    //     setOpen(true);
                    //     setSelectedId(row.id ?? 0);
                    //   }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {!bookRecords.items.length && (
                <TableRow className="TableRow">
                  <TableCell colSpan={5} className="TableCell">
                    <Typography align="center" className="noDataText">
                      No Books
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>


    </>
    );

}
export default ProductPage;