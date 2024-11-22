const uriAPI = import.meta.env.VITE_API_URL

async function fetchAPI({endpoint, method = 'GET', body = null, error = null}) {

    const response = await fetch(`${uriAPI}/${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: body ? JSON.stringify(body) : undefined
    });

    const result = await response.json();

    if (!response.ok || result.error) {
        console.error('ERROR');
        console.table(result);
        throw (error || 'Error en la solicitud');
    }

    return result;
}

async function findAll(filter = '', dateRangeDto = null) {

    const response = await fetchAPI({
        endpoint: `visitor/findAll?${filter}`, 
        method: 'POST',
        body: dateRangeDto,
        error: 'Error al obtener los visitantes'
    });
    return response;
}

async function getDates() {
    const response = await fetchAPI({
        endpoint: `visitor/date`, 
        method: 'GET',
        error: 'Error al obtener las fechas'
    });
    return response;
}

async function getYears() {
    const response = await fetchAPI({
        endpoint: `visitor/year`, 
        method: 'GET',
        error: 'Error al obtener los años'
    });
    return response;
}

async function getMonth(year) {
    const response = await fetchAPI({
        endpoint: `visitor/month/${year}`, 
        method: 'GET',
        error: 'Error al obtener los meses'
    });
    return response;
}

async function findById(id) {
    const response = await fetchAPI({
        endpoint: `visitor/${id}`, 
        method: 'GET',
        error: 'Error al obtener al visitante'
    });
    return response;
}

async function findAllMapping(filter = '', dateRangeDto = null) {

    const visitors = await findAll(filter, dateRangeDto);
    return visitors.map(visitor => {
        const { user, directorate_has_sector, employee, ...rest } = visitor;
        return {
            user: user.profile,
            office: directorate_has_sector.name,
            employee: `${employee.last_name} ${employee.name}`,
            ...rest
        };
    });
}

async function findByIdMapping(id) {

    const visitor = await findById(id);

    const { user, directorate_has_sector, employee, institutional_departments, another_origin, ...rest } = visitor;

    return {
        user: user.profile,
        office: directorate_has_sector.name,
        employee: `${employee.last_name} ${employee.name}`,
        institutional_departments: institutional_departments?.name ?? another_origin,
        government_institutions: institutional_departments?.government_institutions?.name ?? 'Otro',
        ...rest
    };
}

async function findBySummary(startDateState, endDateState) {

    const startDate = startDateState.format("YYYY-MM-DD"); // Ejemplo: '2024-11-01'
    const endDate = endDateState.format("YYYY-MM-DD");   // Ejemplo: '2024-11-30'

    return findAllMapping('', {startDate, endDate})
}

async function findAllPending(mapping = true) {
        
    if (mapping) return findAllMapping('exit=false');
    
    return findAll('exit=false');
}

async function update(id, newVisitor) {

    console.log('newVisitor',newVisitor)

    const response = await fetchAPI({
        endpoint: `visitor/${id}`, 
        method: 'PATCH', 
        body: newVisitor,
        error: 'Error al actualizar el visitante'
    });
    return response;
}

async function create(newVisitor) {

    const response = await fetch(`${uriAPI}/visitor`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: newVisitor
    });

    const result = await response.json();

    if (!response.ok || result.error) {
        console.error('ERROR');
        console.table(result);
        throw (error || 'Error en la solicitud');
    }

    return result;
}

export default {
    findAll,
    findAllMapping,
    findByIdMapping,
    findAllPending,
    findById,
    update,
    create,
    getYears,
    getMonth,
    findBySummary,
    getDates
}