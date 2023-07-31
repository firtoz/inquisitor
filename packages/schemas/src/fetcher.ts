import React from 'react';

function isIsoDate(str: string): Date | null {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) {
        return null;
    }

    const d = new Date(str);

    return (!isNaN(d.getTime()) && d.toISOString() === str) ? d : null; // valid date
}

export const useFetchData = <TData, TVariables>(
    query: string,
    options?: RequestInit['headers']
): ((variables?: TVariables) => Promise<TData>) => {
    // it is safe to call React Hooks here.
    // const { url, headers } = React.useContext(FetchParamsContext)

    const url = 'http://localhost:4000/graphql'

    return async (variables?: TVariables) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // ...headers,
                ...options
            },
            body: JSON.stringify({
                query,
                variables
            })
        })

        const jsonText = await res.text();

        const json = JSON.parse(jsonText, (key, value) => {
            // if value is a date string, return a Date object
            if (typeof value === 'string') {
                const date = isIsoDate(value)
                if (date) {
                    return date
                }
            }

            return value
        });

        if (json.errors) {
            const {message} = json.errors[0] || {}
            throw new Error(message || 'Error…')
        }

        return json.data
    }
}
