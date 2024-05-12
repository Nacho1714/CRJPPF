import moment from 'moment';

export const getRecordsPerDay = (date: Date) => {

    if (!date) return undefined;

    return {
        gte: moment.utc(date).startOf('day').toDate(),
        lte: moment.utc(date).endOf('day').toDate()
    }
}

export const getOptionQuery = (option?: string | boolean) => {

    if (option === 'true') return {
        not: null
    }

    if (option === 'false') return {
        in: null
    }

    return undefined;
}