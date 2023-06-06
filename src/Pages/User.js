import React from 'react';
import '../css/header.css';
import '../css/product.css';
import userService from '../service/user.service';
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
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Typography } from "@mui/material";


const User = () => {
    const defaultFilter = {
        pageIndex: 1,
        pageSize: 10,
    };
    const [filters, setFilters] = useState(defaultFilter);
    const [user, setUser] = useState({
        pageIndex: 0,
        pageSize: 10,
        totalPages: 1,
        items: [],
        totalItems: 0,
    });
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(0);
    const Navigate = useNavigate();

    useEffect(() => {
        getAllUsers({ ...filters });
    }, [filters]);

    const getAllUsers = async (filters) => {
        await userService.getAllUsers(filters).then((res) => {
            if (res) {
                setUser(res);
            }
        });
    };
    const columns = [
        { id: 'ID', label: 'ID', width: 70 },
        { id: "firstName", label: "First Name", width: 70 },
        { id: "lastName", label: "Last Name", width: 70 },
        {
            id: "email",
            label: "Email",
            width: 150,
        },
        {
            id: "role",
            label: "Role",
            width: 70,
        },
    ];
    const onConfirmDelete = () => {
        userService
            .deleteUser(selectedId)
            .then((res) => {
                if (res) {
                    toast.success("User Deleted Successfully...");
                    setOpen(false);
                    setFilters({ ...filters });
                }
            });
    };


    return (
        <>
            <div>
                <div className='center'>
                    <div className="loginheader">User</div>
                    <hr color="red" width='15%' />
                </div>
            </div>
            <div className='searchContainer'>
                <input type='search' placeholder='search' className='productSearch'></input>
                <button type='submit' className='productbtn' onClick={() => Navigate('/register')}>Add User</button>
            </div>
            <div style={{ marginBottom: '45px' }}></div>
            <div style={{ margin: 'auto', width: '90%' }}>
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
                            {user?.items?.map((row, index) => {
                                return (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.firstName}</TableCell>
                                        <TableCell>{row.lastName}</TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>{row.role}</TableCell>
                                        <TableCell>
                                            <Button
                                                type="button"
                                                className="green-btn btn"
                                                color='success'
                                                variant="outlined"
                                                disableElevation
                                                onClick={() => {
                                                    Navigate('/edit-user');
                                                }}
                                            >
                                                Edit
                                            </Button>
                                            <span style={{ marginRight: '15px' }}></span>
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
                            {!user.items.length && (
                                <TableRow >
                                    <TableCell colSpan={5}>
                                        <Typography align="center" className="noDataText">
                                            No any User Available...
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[2, 5, 10, 100,200]}
                    component="div"
                    count={user.totalItems}
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
                    title="Delete User"
                    description="Are you sure you want to delete this User?"
                />
            </div>
        </>
    );

}
export default User;