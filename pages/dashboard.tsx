import { listApps } from "@/src/graphql/queries";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { GraphQLQuery } from "@aws-amplify/api";
import { ListAppsQuery } from "@/src/API";
import { useTable } from "@/hooks/useTable";
import { useRouter } from "next/router";

const Dashboard = () => {
  const [apps, setApps] =
    useState<GraphQLResult<GraphQLQuery<ListAppsQuery>>>();

  const updateAppInfo = async () => {
    const allApps = await API.graphql<GraphQLQuery<ListAppsQuery>>({
      query: listApps,
      authMode: "API_KEY",
    });
    setApps(allApps);
    console.log(allApps);
  };

  useEffect(() => {
    updateAppInfo();
  }, []);

  const { columns } = useTable();
  const { push } = useRouter();

  const handleRowClick = (e: any) => {
    push("/apps/" + e.id);
  };

  return (
    <div>
      {apps?.data?.listApps?.items && (
        <DataGrid
          rows={apps?.data.listApps.items}
          onRowClick={handleRowClick}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      )}
    </div>
  );
};

export default Dashboard;
