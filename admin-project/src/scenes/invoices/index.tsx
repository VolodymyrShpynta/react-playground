import { Box, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Header } from "../../components/Header";
import { mockDataInvoices } from "../../data/mockData";

const Invoices = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
    { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => (
        <Typography sx={{ color: 'secondary.light', display: 'flex', alignItems: 'center', height: '100%' }}>
          ${params.row.cost}
        </Typography>
      ),
    },
    { field: "date", headerName: "Date", flex: 1 }
  ];

  return (
    <Box m="20px">
      <Header title="INVOICES" subtitle="List of Invoice Balances" />
      <Box
        sx={{
          "& .name-column--cell": {
            color: 'secondary.lighter',
          },
        }}
      >
        <DataGrid
          columns={columns}
          rows={mockDataInvoices}
          checkboxSelection
        />
      </Box>
    </Box>
  )
}

export default Invoices;