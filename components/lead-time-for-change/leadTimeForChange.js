// components/deploymentFrequency.js
import { useState, useEffect } from 'react';
import { getDaysBetweenDates } from '@/components/date-range-selector'

export default function fetchLeadTimeForChangeData(appName, dateRange) {
    const [ltfcData, setLtfcData] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = `${process.env.NEXT_PUBLIC_PELORUS_API_URL}/sdp/lead_time_for_change/${appName}/data?range=${getDaysBetweenDates(dateRange)}d&start=${dateRange.to.getTime() / 1000}`;
                const response = await fetch(req);
                const data = await response.json();
                const sortedData = data.sort((d1, d2) => (d1.timestamp > d2.timestamp) ? 1 : (d1.timestamp < d2.timestamp) ? -1 : 0);
                setLtfcData(sortedData);
            } catch (error) {
                console.error('Error fetching deployment frequency data:', error);
            } finally {
                setLoading(false); // Set loading to false regardless of success or failure
            }
        };

        fetchData();
    }, [appName, dateRange]);

    return { ltfcData, loading }; // Return loading state along with dfData
}

export function fetchLeadTimeForChange(appName, dateRange) {
    const [response, setResponse] = useState([])
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = `${process.env.NEXT_PUBLIC_PELORUS_API_URL}/sdp/lead_time_for_change/${appName}?range=${getDaysBetweenDates(dateRange)}d&start=${dateRange.to.getTime() / 1000}`;
                const response = await fetch(req);
                const data = await response.json()
                setResponse(data)
            } catch(error) {
                console.error('Error fetching lead time for change:', error);
            } finally {
                setLoading(false)
            }
        };

        fetchData();
    }, [dateRange, appName]);
  
    return { response, loading }; // Return loading state along with cfrData
}
