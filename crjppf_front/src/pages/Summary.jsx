import { useEffect, useState } from 'react';
import TableSummary from '../components/tables/TableSummary';
import SearchBar from '../components/SearchBar';
import { useSnackbar } from 'notistack';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

import FormConfirm from '../components/forms/FormConfirm';

import VisitorService from '../services/visitor.service';

export default function Summary() {

    const [visitors, setVisitors] = useState([]);
    const [results, setResults] = useState([]);

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [allowedDates, setAllowedDates] = useState(null)

    const [cleared, setCleared] = useState({
        picker1: false,
        picker2: false,
    });
    
    const [showConfirm, setShowConfirm] = useState(false);
    const [action, setAction] = useState({});
    
    const [update, setUpdate] = useState(true);
    
    const { enqueueSnackbar } = useSnackbar();

    const shouldDisableDate = (date) => {
        // Verifica si la fecha está en la lista permitida
        return !allowedDates.some((allowedDate) =>
            allowedDate.isSame(date, 'day')
        );
    };

    const onSubmit = async() => {

        try {

            if (!startDate || !endDate) throw ("¡Se ha producido un error!");

            const visitors = await VisitorService.findBySummary(startDate, endDate)

            localStorage.setItem('visitors', JSON.stringify(visitors));

            setVisitors(visitors)
            setResults(visitors)
        } catch (errorMessage) {
            enqueueSnackbar(errorMessage, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }
            })
        }
    }

    const handleClear = (picker) => {
        setCleared(prev => ({
            ...prev,
            [picker]: true,
        }));
    };

    useEffect(() => {

        (async () => {
            try {
                const dates = await VisitorService.getDates()
                const dayjsDates = dates.map(date => dayjs(date));

                const visitors = JSON.parse(localStorage.getItem('visitors'))

                setVisitors(visitors)
                setResults(visitors)
                setAllowedDates(dayjsDates)
            } catch (errorMessage) {
                enqueueSnackbar(errorMessage, {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    }
                })
            }
        })()

    }, [update])

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCleared({ picker1: false, picker2: false });
        }, 1500);
      
        return () => clearTimeout(timeout);
    }, [cleared]);

    return (

        <div id="content" className="bg-grey w-100">

            <section className="bg-light py-3">

                <div className="container">

                    <div className="row">

                        <div className="col-lg-9 col-md-8">
                            <h1 className="font-weight-bold mb-0">Informe</h1>
                            <p className="lead text-muted">Revisa la última información</p>
                        </div>

                    </div>

                </div>

            </section>

            <section className="bg-mix py-3">

                <div className="container">

                    <div className="card rounded-0">

                        <div className="card-body">

                            <div className="row">

                                <FormConfirm
                                    showConfirm={showConfirm}
                                    setShowConfirm={setShowConfirm}
                                    action={action}
                                    setAction={setAction}
                                    setUpdate={setUpdate}
                                    update={update}
                                />

                                <div className="col-lg-3 col-md-6 stat my-3 d-flex">

                                    <div className="mx-auto d-flex w-100 justify-content-center align-items-center">

                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DesktopDatePicker
                                                label="Inicio"
                                                value={startDate}
                                                onChange={(newValue) => {
                                                    setVisitors([])
                                                    setResults([])
                                                    setStartDate(newValue)
                                                }} 
                                                shouldDisableDate={shouldDisableDate} // Aplica las restricciones
                                                maxDate={endDate}
                                                slotProps={{
                                                    field: { clearable: true, onClear: () => handleClear('picker1') },
                                                }}
                                            />
                                        </LocalizationProvider>

                                    </div>

                                </div>

                                <div className="col-lg-3 col-md-6 stat my-3 d-flex">

                                    <div className="mx-auto d-flex w-100 justify-content-center align-items-center">

                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DesktopDatePicker
                                                label="Fin"
                                                value={endDate}
                                                onChange={(newValue) => {
                                                    setVisitors([])
                                                    setResults([])
                                                    setEndDate(newValue)
                                                }} 
                                                shouldDisableDate={shouldDisableDate} // Aplica las restricciones
                                                minDate={startDate}
                                                slotProps={{
                                                    field: { clearable: true, onClear: () => handleClear('picker2') },
                                                }}
                                            />
                                        </LocalizationProvider>

                                    </div>

                                </div>
                                
                                <div className="col-lg-3 col-md-6 stat my-3 d-flex">


                                    <div className="mx-auto d-flex w-100 justify-content-center align-items-center">

                                        <Button
                                            type="button"
                                            variant="primary"
                                            className="btn w-75 h-100 fs-4"
                                            onClick={onSubmit}
                                        >
                                            Buscar
                                        </Button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            <section>

                <div className="container">

                    <div className="row">

                        <div className="col-lg-12 my-3">

                            <div className="card rounded-0">

                                <div className="card-header bg-light">

                                    <h3 className="h6 fw-bold mb-0">Visitantes ({results && results.length})</h3>

                                </div>

                                <div>

                                    <SearchBar
                                        data={visitors}
                                        setResults={setResults}
                                        propertyName='last_name'
                                    />

                                </div>

                                <div className="card-header">

                                    <TableSummary
                                        visitors={results}
                                        formConfirm={{
                                            setShowConfirm: setShowConfirm,
                                            setAction: setAction
                                        }}
                                    />

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>

    )
}