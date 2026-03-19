import { Box, useTheme } from "@mui/material";
import { useMemo } from "react";
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { colorTokens } from "../../theme";
import { Header } from "../../components/Header";
import { mockDataContacts } from "../../data/mockData";

const Contacts = () => {
  const theme = useTheme();
  const colors = useMemo(() => colorTokens(theme.palette.mode), [theme.palette.mode]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Registrar ID" },
    { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
    { field: "age", headerName: "Age", type: "number", headerAlign: "left", align: "left" },
    { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "zipCode", headerName: "Zip Code", flex: 1 }
  ];

  return (
    <Box m="20px">
      <Header title="CONTACTS" subtitle="List of Contacts for Future Reference" />
      <Box
        sx={{
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
        }}
      >
        <DataGrid
          columns={columns}
          rows={mockDataContacts}
          showToolbar
        />
      </Box>
    </Box>
  )
}

export default Contacts;