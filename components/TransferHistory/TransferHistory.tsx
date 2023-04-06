import * as React from 'react';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { getHistory } from '../../src/utils/apiRoutes';
import { useAppContext } from '../../context';

interface Column {
	id: 'blockNumber' | 'from' | 'to' | 'value' | 'txHash';
	label: string;
	minWidth?: number;
	align?: 'right' | 'left' | 'center';
	format?: (value: any) => any;
}

const columns: readonly Column[] = [
	{ id: 'blockNumber', label: 'blockNumber', minWidth: 130 },
	{ id: 'from', label: 'from', minWidth: 100 },
	{
		id: 'to',
		label: 'to',
		minWidth: 170,
		align: 'left',
	},
	{
		id: 'value',
		label: 'value',
		minWidth: 170,
		align: 'left',
		format: (value: number) => { return (value / 1e6).toString() + '$' }
	},
	{
		id: 'txHash',
		label: 'txHash',
		format: (value: string) => <a target={"_blank"} href={'https://etherscan.io/tx/' + value}>{value}</a>
	}
];

export default function TransferHistory() {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	// const [rows, setRows] = useState([]);
	const { history, getHistoryFunc } = useAppContext();

	useEffect(() => {
		getHistoryFunc();
	}, [])
	const handleChangePage = async (event: unknown, newPage: number) => {
		await getHistoryFunc(newPage + 1, rowsPerPage);
		setPage(newPage);
	};

	const handleChangeRowsPerPage = async (event: React.ChangeEvent<HTMLInputElement>) => {
		await getHistoryFunc(page + 1, event.target.value);
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{history.data
							.map((row, idx) => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={idx}>
										{columns.map((column) => {
											const value = row[column.id];
											return (
												<TableCell key={column.id} align={column.align}>
													{column.format
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
				count={history.totalCount}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}