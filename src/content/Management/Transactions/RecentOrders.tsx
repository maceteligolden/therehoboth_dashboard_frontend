import { Card, Icon, IconButton, Tooltip, useTheme } from '@mui/material';
import RecentOrdersTable from './RecentOrdersTable';
import { useDeleteBlogMutation, useGetBlogsQuery } from '@/services/blog.service';
import Table from '@/components/table';
import Link from 'next/link';
import { GridColDef, GridRenderCellParams, GridRowSelectionModel } from '@mui/x-data-grid';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useState } from 'react';
import Toast, { IHandleMotion } from '@/components/Toast';
import { useRouter } from 'next/router';

function RecentOrders() {

  const router = useRouter();

  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  const [successToastStatus, setSuccessToastStatus] = useState<IHandleMotion>({
    message: "",
    visibility: false,
    status: false,
  });
  const [errorToastStatus, setErrorToastStatus] = useState<IHandleMotion>({
    message: "",
    visibility: false,
    status: false,
  });

  const successToastHandler = (args: IHandleMotion) => {
    setSuccessToastStatus(args);
  };

  const errorToastHandler = (args: IHandleMotion) => {
    setErrorToastStatus(args);
  };

  const { data, isSuccess, refetch } = useGetBlogsQuery();

  const [ deleteBlog, { isLoading }] = useDeleteBlogMutation();

  const handleBlogDelete = (id: string) => {
    deleteBlog({
      id
    }).then((res: any)=>{
      if (res.data.status === "success") {
        setTimeout(()=> {
          refetch()
        }, 1000)
        
        successToastHandler({
          message: res.data.message,
          visibility: true,
          status: true,
        });
        
      } else {
        errorToastHandler({
          message: res.data.message,
          visibility: true,
          status: false,
        });
      }
    }).catch((err: any)=> {
      errorToastHandler({
        message: "server error",
        visibility: true,
        status: false,
      });
    })
  }

  let rows: any[] = [];

  isSuccess &&
  data?.data.map((ticket: any) => {
    rows.push({
      id: ticket._id,
      title: ticket.title,
    });
  });

  const theme = useTheme();

const columns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 370 },
  
  {
    field: "action",
    headerName: "Action",
    type: "actions",
    renderCell: (params: GridRenderCellParams<Date>) => (
      <>
        <Tooltip title="Edit Order" arrow>
          <IconButton
            sx={{
              '&:hover': {
                background: theme.colors.primary.lighter
              },
              color: theme.palette.primary.main
            }}
            color="inherit"
            size="small"
            onClick={() => router.push(`/blogs/${params.id}`)}
          >
            <EditTwoToneIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Order" arrow>
          <IconButton
            sx={{
              '&:hover': { background: theme.colors.error.lighter },
              color: theme.palette.error.main
            }}
            color="inherit"
            size="small"
            onClick={() =>handleBlogDelete(params.id.toString())}
          >
            <DeleteTwoToneIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </>
    ),
    width: 100,
  },
];

console.log(isSuccess && data.data)
  return (
    <Card>
      { isSuccess ? 
        <>
          <Table
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={5}
            rowSelectionModel={rowSelectionModel}
            onRowSelectionModelChange={(newRowSelectionModel: any) => {
              setRowSelectionModel(newRowSelectionModel);
            }}
          />
        </>
        :

        <p>Loading</p>
      }

      <Toast
        message={successToastStatus.message}
        severity={"success"}
        status={successToastStatus.visibility}
        handler={function (): void {
            setSuccessToastStatus({
            visibility: false,
            });
        }}
      />

      <Toast
        message={errorToastStatus.message}
        severity={"error"}
        status={errorToastStatus.visibility}
        handler={function (): void {
            setErrorToastStatus({
            visibility: false,
            });
        }}
      />
    </Card>
  );
}

export default RecentOrders;
