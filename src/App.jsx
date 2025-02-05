import React from 'react';
import './App.css';
import DataTable from './DataTable';

const App = () => {
  // Sample data for the table
  const data = [
    { id: 1, name: 'John Doe', age: 28, country: 'USA' },
    { id: 2, name: 'Jane Smith', age: 34, country: 'Canada' },
    { id: 3, name: 'David Johnson', age: 45, country: 'UK' },
    { id: 4, name: 'Emily Davis', age: 29, country: 'Australia' },
    { id: 5, name: 'Michael Brown', age: 50, country: 'Germany' },
    { id: 6, name: 'Sarah Wilson', age: 31, country: 'France' },
    { id: 7, name: 'James Taylor', age: 41, country: 'Italy' },
    { id: 8, name: 'Linda Anderson', age: 23, country: 'Spain' },
   
  ];

  return (
    <div className="App">
      <h1 className='mainh'>Data Table with Pagination, Sorting, and Export</h1>
      <DataTable data={data} />
    </div>
  );
};

export default App;
