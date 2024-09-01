// export const API_KEY = 'demo';
export const API_KEY = 'RIBXT3XYLI69PC0Q'

export interface Data {
    date: Date;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    [key: string]: any;
}

function parseData(timeSeries: any): Data[] {
    const data = []
    for (const [key, value] of Object.entries(timeSeries)) {
        const entry = value as Data
        data.push({
            date: new Date(key),
            open: Number(entry["1. open"]),
            high: Number(entry["2. high"]),
            low: Number(entry["3. low"]),
            close: Number(entry["4. close"]),
            volume: Number(entry["5. volume"]),
        } as unknown as Data)
    }
    return data;
}

function callStocksAPI(url: string, keyToExtract: string): Promise<Data[]> {
    const promiseIntraDayContinuous = fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let dat = parseData(data[keyToExtract]);
            dat.sort((a, b) => {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                return dateA - dateB;
            });
            return dat;
        });
    return promiseIntraDayContinuous;
}

export function getData(): Promise<Data[]> {
    return callStocksAPI(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=${API_KEY}`, 'Time Series (5min)')
}

export function getWeeklyData(): Promise<Data[]> {
    return callStocksAPI(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=${API_KEY}`, 'Weekly Time Series')
}

export function getMonthlyData(): Promise<Data[]> {
    return callStocksAPI(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=${API_KEY}`, 'Monthly Time Series')
}