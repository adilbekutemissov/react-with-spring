import React, {Component, useState} from 'react';

/**
 * Header for Login page
 */
export default class GroupTableComponent extends Component {

    columns = [
        {id: 'name', label: 'Name', minWidth: 170},
        {id: 'students', label: 'Students', minWidth: 170}
    ];

    state = {
        page: 0,
        rowsPerPage: 10,
        group: []
    };

    componentDidMount() {
        fetch('/teacher/1/groups')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                console.log('FDF');
                this.setState({group: data});
            })
            .catch(console.log);
    }

    handleChangePage(event, newPage) {
        this.state.page = newPage;
    }

    handleChangeRowsPerPage (event) {
        this.state.page = 0;
        this.state.rowsPerPage = +event.target.value;
    }

    render() {
        return (
            <Paper>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {this.columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.group.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {this.columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={this.state.group.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}