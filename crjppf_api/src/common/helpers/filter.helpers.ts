import moment from 'moment';
import { DateRangeDto } from 'src/visitor/dto';

export const getRecordsPerDay = (dateRange: DateRangeDto) => {

    if (!dateRange) return undefined;

    const {startDate, endDate} = dateRange

    return {
        gte: moment.utc(startDate).startOf('day').toDate(),
        lte: moment.utc(endDate).endOf('day').toDate()
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