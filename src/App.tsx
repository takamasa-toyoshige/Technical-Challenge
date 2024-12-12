import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.e-stat.go.jp/rest/3.0/app/json/getStatsData', {
          params: {
            appId: import.meta.env.VITE_APP_ESTAT_API_KEY,
            statsDataId: '0000010201',
            cdArea: '13000,14000,12000,11000,08000,09000,10000,19000',
            cdCat01: '#A011000',
          }
        });
        const sortedData = response.data.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE.sort((a: any, b: any) => b["@time"] - a["@time"]);
        setData(sortedData);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    //{data.map((row: any, i: number) => (
      
    //))}

    fetchData();
  }, []);

  return (
    <div>
      <h1>統計データ</h1>
      {data ? (
        <table>
          <thead>
            <tr>
              <th>年代</th>
              <th>東京都</th>
              <th>神奈川県</th>
              <th>千葉県</th>
              <th>埼玉県</th>
              <th>茨城県</th>
              <th>栃木県</th>
              <th>群馬県</th>
              <th>山梨県</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row: any, i: number) => (
              <tr key={i}>
                <td>{row['@time']}</td>
                <td>{row["@area"] === '13000' ? row['$'] : ''}</td>
                <td>{row["@area"] === '14000' ? row['$'] : ''}</td>
                <td>{row["@area"] === '12000' ? row['$'] : ''}</td>
                <td>{row["@area"] === '11000' ? row['$'] : ''}</td>
                <td>{row["@area"] === '08000' ? row['$'] : ''}</td>
                <td>{row["@area"] === '09000' ? row['$'] : ''}</td>
                <td>{row["@area"] === '10000' ? row['$'] : ''}</td>
                <td>{row["@area"] === '19000' ? row['$'] : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;