import { Box, Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { colorTokens } from "../../theme";
import { Header } from "../../components/Header";
import { mockDataInvoices } from "../../data/mockData";

const Invoices = () => {
  const theme = useTheme();
  const colors = useMemo(() => colorTokens(theme.palette.mode), [theme.palette.mode]);

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
        <Typography sx={{ color: colors.greenAccent[400], display: 'flex', alignItems: 'center', height: '100%' }}>
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
            color: colors.greenAccent[300],
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