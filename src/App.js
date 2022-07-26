import './App.css';
import Plot from 'react-plotly.js';
import React from 'react';
import { useState } from 'react';
var symbol;
var ChartXValues = []
var ChartYValues = []
function App() {
  const [data, setData] = useState('');
  const [display, setDisplay ] = useState(false);
  const searchData = (val) => {
    setData(val);
    console.log(val);
    symbol = val;

    const API_KEY = 'Z84N7KEVLAH28I5R';
    let StockSymbol = symbol;
    let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol}&apikey=${API_KEY}`;
    let ChartXValuesFunction = [];
    let ChartYValuesFunction = [];
  
    fetch(API_CALL)
      .then(
        function (response) {
          return response.json();
        }
      )
      .then(
        function (data) {
          console.log(data);
  
          for (var key in data['Time Series (Daily)']) {
            ChartXValuesFunction.push(key);
            ChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
          }
          ChartXValues = ChartXValuesFunction
          ChartYValues = ChartYValuesFunction
        }
      )
  }
  

  return (
    <div className="App">
      <h1>Stock Chart</h1>
      {
        display?
        <Plot
        data={[
          {
            x: ChartXValues,
            y: ChartYValues,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' },
          },
        ]}
        layout={{ width: 1000, height: 600, title: 'A Fancy Plot' }}
      />
      :null
      }
      <input
        type='text'
        onChange={(e) => searchData(e.target.value)}
      />
      <button onClick={()=>setDisplay(true)}>Display Chart</button>
      
      
    </div>
  );
}
export default App;
