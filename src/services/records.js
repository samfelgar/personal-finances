import { api } from "./api";
import { endOfMonth, format, startOfMonth } from "date-fns";

export async function retrieveByReference(reference) {
    const date = wrapDate(reference);
    const startDate = startOfMonth(date);
    const endDate = endOfMonth(date);

    const response = await api.get('/records', {
        params: {
            start_date: normalizeReferenceDate(startDate),
            end_date: normalizeReferenceDate(endDate)
        }
    });

    return response.data;
}

export async function storeRecord(record) {
    record.reference = normalizeReferenceDate(record.reference);

    const response = await api.post('/records', record);
    return response.data;
}

export async function editRecord(record) {
    record.reference = normalizeReferenceDate(record.reference);

    const response = await api.put(`/records/${record.id}`, record);
    return response.data;
}

export async function updatePaidInformation(record) {
    const response = await api.put(`/records/${record.id}/paid`, {
        paid: record.paid,
    });
    return response.data;
}

export async function deleteRecord(record) {
    const response = await api.delete(`/records/${record.id}`);

    return response.status >= 200 || response.status < 300;
}

function wrapDate(date) {
    if (!(date instanceof Date)) {
        return new Date(date);
    }

    return date;
}

function normalizeReferenceDate(date) {
    date = wrapDate(date);
    return format(date, 'yyyy-MM-dd');
}
