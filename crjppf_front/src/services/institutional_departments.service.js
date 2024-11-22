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

async function findAll(filter = '') {
    const response = await fetchAPI({
        endpoint: `institutional-departments?${filter}`, 
        method: 'GET',
        error: 'Error al obtener los departamentos institucionales'
    });
    return response;
}

async function findByGovernmentInstitution(idGovernmentInstitution) {

    const response = await fetchAPI({
        endpoint: `institutional-departments/government-institutions/${idGovernmentInstitution}`, 
        method: 'GET',
        error: 'Error al obtener los departamentos institucionales'
    });
    return response;
}

export default {
    findAll,
    findByGovernmentInstitution
}