import { useEffect, useState } from 'react';
import './App.css';
import Chart from './components/Chart';
import { Data, getData, getMonthlyData, getWeeklyData } from './utils/utils';

function App() {
  const [dailyData, setDailyData] = useState<Data[]>([]);
  const [weeklyData, setWeeklyData] = useState<Data[]>([]);
  const [monthlyData, setMonthlyData] = useState<Data[]>([]);

  useEffect(() => {
    getData().then((data) => setDailyData(data));
    getWeeklyData().then((data) => setWeeklyData(data));
    getMonthlyData().then((data) => setMonthlyData(data));
  }, []);

  return (
    <div className="App">
      <div className='container'>
        <h3>Daily</h3>
        {dailyData && dailyData.length > 0 && <Chart data={dailyData} />}
      </div>
      <div className='container'>
        <h3>Weekly</h3>
        {weeklyData && weeklyData.length > 0 && <Chart data={weeklyData} />}
      </div>
      <div className='container'>
        <h3>Monthly</h3>
        {monthlyData && monthlyData.length > 0 && <Chart data={monthlyData} />}
      </div>
    </div>
  );
}

export default App;