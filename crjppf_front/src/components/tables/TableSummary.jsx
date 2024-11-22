import { Link } from 'react-router-dom';
import TableDataGrid from './TableDataGrid';
import Button from 'react-bootstrap/esm/Button';
import moment from 'moment';
import dayjs from 'dayjs';

import VisitorService from '../../services/visitor.service';

export default function TableSummary({ visitors, formConfirm }) {

    const columns = [
        { 
            field: 'name', 
            headerName: 'Visitante', 
            renderCell: (params) => (<Link to={`/visitor/${params.row?.visitor_id}`}>{params.row?.last_name + ' ' + params.row?.name}</Link>),
            valueGetter: (params) => params.row?.name + ' ' + params.row?.last_name,  
            flex: 2,
        },
        { field: 'employee', headerName: 'Empleado', flex: 2 },
        { field: 'document_type', headerName: 'Tipo Doc' },
        { field: 'document_number', headerName: 'Documento' },
        { 
            field: 'entry', 
            headerName: 'Entrada',
            renderCell: (params) => (moment.utc(params.row?.entry).format('HH:mm'))
        },
        { 
            field: 'exit', 
            headerName: 'Salida',
            renderCell: (params) => (moment.utc(params.row?.exit).format('HH:mm'))
        },
        { 
            field: 'created_at', 
            headerName: 'Fecha',
            renderCell: (params) => (moment.utc(params.row?.entry).format('YYYY-MM-DD'))
        }
    ];

    return (

        <TableDataGrid
            columns={columns}
            rows={visitors}
            rowIdName={'visitor_id'}
        />

    );

}