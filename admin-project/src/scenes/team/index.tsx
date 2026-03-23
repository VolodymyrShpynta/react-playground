import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Header } from "../../components/Header";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SecurityIcon from '@mui/icons-material/Security';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const Team = () => {
  const theme = useTheme();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
    { field: "age", headerName: "Age", type: "number", headerAlign: "left", align: "left" },
    { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "access", headerName: "Access Level", headerAlign: "center", flex: 1,
      display: 'flex',
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            sx={{
              minWidth: 100,
              width: '65%',
              m: '0 auto',
              p: '5px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:
                access === 'admin' ? theme.palette.secondary.dark : theme.palette.secondary.darker,
              borderRadius: '4px',
            }}
          >
            {access === 'admin' && <AdminPanelSettingsIcon />}
            {access === 'manager' && <SecurityIcon />}
            {access === 'user' && <LockOpenIcon />}
            <Typography color="text.primary" sx={{ ml: '5px' }}>
              {access}
            </Typography>
          </Box>
        );
      }
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        sx={{
          "& .name-column--cell": {
            color: 'secondary.lighter',
          },
        }}
      >
        <DataGrid
          columns={columns}
          rows={mockDataTeam}
        />
      </Box>
    </Box>
  )
}

export default Team;