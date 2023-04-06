import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { getAccounts } from '../../src/utils/apiRoutes';
import { useAppContext } from '../../context';

interface Column {
  id: 'address' | 'balance';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (balance: number) => string;
}

const columns: readonly Column[] = [
  { id: 'address', label: 'address', minWidth: 170 },
  {
    id: 'balance',
    label: 'balance', minWidth: 100,
    format: (balance: number) => { return (balance / 1e6).toString() + '$' }
  },
];

interface Data {
  address: string;
  balance: number;
}

function createData(
  address: string,
  balance: number,
): Data {
  return { address, balance };
}


export default function TokenHolderList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { accounts, getAccountsFunc } = useAppContext();
  React.useEffect(() => {
    getAccountsFunc(page + 1, rowsPerPage);
  }, []);

  const handleChangePage = async (event: unknown, newPage: number) => {
    await getAccountsFunc(newPage + 1, rowsPerPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    getAccountsFunc(page + 1, event.target.value);
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, height: 1 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.data
              .map((row, idx) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
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
        count={9999}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}