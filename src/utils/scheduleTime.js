const pad2 = (value) => String(value).padStart(2, '0');

export const formatDateInputValue = (date) => {
    const value = date instanceof Date ? date : new Date(date);
    if (Number.isNaN(value.getTime())) return '';

    return `${value.getFullYear()}-${pad2(value.getMonth() + 1)}-${pad2(value.getDate())}`;
};

export const buildScheduledIso = (dateValue, timeValue) => {
    if (!dateValue || !timeValue) {
        throw new Error('Choose both a schedule date and time.');
    }

    const [year, month, day] = dateValue.split('-').map(Number);
    const [hour, minute] = timeValue.split(':').map(Number);
    const scheduledAt = new Date(year, month - 1, day, hour, minute || 0, 0, 0);

    if (Number.isNaN(scheduledAt.getTime())) {
        throw new Error('Choose a valid schedule date and time.');
    }

    return scheduledAt.toISOString();
};

export const getLocalDateKey = (dateValue) => {
    const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
    return formatDateInputValue(date);
};

export const formatLocalTime = (dateValue) => {
    const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
    if (Number.isNaN(date.getTime())) return '';

    return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
};

export const formatSchedulePreview = (dateValue, timeValue) => {
    try {
        return new Date(buildScheduledIso(dateValue, timeValue)).toLocaleString();
    } catch {
        return '';
    }
};
