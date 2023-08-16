import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

interface ITable {
    rows: any[] | undefined;
    columns: GridColDef[];
    pageSize: number;
    rowsPerPageOptions: Number;
    rowSelectionModel: any;
    onRowSelectionModelChange: any;
}

export default function Table(props: ITable) {
  return (
    <div style={{ height: 400, width: '100%', backgroundColor: 'white' }}>
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        pageSizeOptions={[5]}
        checkboxSelection
        onRowSelectionModelChange={props.onRowSelectionModelChange}
        rowSelectionModel={props.rowSelectionModel}
      />
    </div>
  );
}
