import { GridColDef, GridRowsProp } from "@mui/x-data-grid";

export const useTable = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "name", headerName: "App", width: 150 },
    { field: "link", headerName: "Link", width: 150 },
  ];

  return { columns };
};
