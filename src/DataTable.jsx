// src/DataTable.jsx
import React, { useMemo, useState } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { CSVLink } from 'react-csv';
import jsPDF  from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import './DataTable.css';
const DataTable = () => {
  const data = useMemo(
    () => [
      { name: 'John', age: 28, country: 'USA' },
      { name: 'Jane', age: 32, country: 'Canada' },
      { name: 'Jake', age: 40, country: 'UK' },
      { name: 'Sophia', age: 22, country: 'Australia' },
      { name: 'John', age: 28, country: 'USA' },
      { name: 'Jane', age: 32, country: 'Canada' },
      { name: 'Jake', age: 40, country: 'UK' },
      { name: 'Sophia', age: 22, country: 'Australia' },
      { name: 'John', age: 28, country: 'USA' },
      { name: 'Jane', age: 32, country: 'Canada' },
      { name: 'Jake', age: 40, country: 'UK' },
      { name: 'Sophia', age: 22, country: 'Australia' },
      { name: 'John', age: 28, country: 'USA' },
      { name: 'Jane', age: 32, country: 'Canada' },
      { name: 'Jake', age: 40, country: 'UK' },
      { name: 'Sophia', age: 22, country: 'Australia' },
      { name: 'John', age: 28, country: 'USA' },
      { name: 'Jane', age: 32, country: 'Canada' },
      { name: 'Jake', age: 40, country: 'UK' },
      { name: 'Sophia', age: 22, country: 'Australia' },
      { name: 'John', age: 28, country: 'USA' },
      { name: 'Jane', age: 32, country: 'Canada' },
      { name: 'Jake', age: 40, country: 'UK' },
      { name: 'Sophia', age: 22, country: 'Australia' },
      { name: 'John', age: 28, country: 'USA' },
      { name: 'Jane', age: 32, country: 'Canada' },
      { name: 'Jake', age: 40, country: 'UK' },
      { name: 'Sophia', age: 22, country: 'Australia' },
      { name: 'John', age: 28, country: 'USA' },
      { name: 'Jane', age: 32, country: 'Canada' },
      { name: 'Jake', age: 40, country: 'UK' },
      { name: 'Sophia', age: 22, country: 'Australia' },
      { name: 'John', age: 28, country: 'USA' },
      { name: 'Jane', age: 32, country: 'Canada' },
      { name: 'Jake', age: 40, country: 'UK' },
      { name: 'Sophia', age: 22, country: 'Australia' },
      { name: 'John', age: 28, country: 'USA' },
      { name: 'Jane', age: 32, country: 'Canada' },
      { name: 'Jake', age: 40, country: 'UK' },
      { name: 'Sophia', age: 22, country: 'Australia' },
    ],
    []
  );

  const columns = useMemo(
    () => [
      { Header: 'Name', accessor: 'name' },
      { Header: 'Age', accessor: 'age' },
      { Header: 'Country', accessor: 'country' },
    ],
    []
  );


  

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    canPreviousPage,
    canNextPage,
    page,
    nextPage,
    previousPage,
    setPageSize,
    
    state: { pageIndex, pageSize },
    doc
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination
  );


//   Export to PDF
  const handlePDFExport = () => {
    
    const doc = new jsPDF({ orientation: 'landscape',pageSize: 'A0', extend : 'pdfHtml5',
        title : function() {
            return "ABCDE List";
        },
        
        text : '<i class="fa fa-file-pdf-o"> PDF</i>', });
    doc.autoTable({ html: '#table' });
    doc.save('table.pdf');
    doc.text('Transitions', 5, 12);
    

  };


  
  // Export to Excel
  const handleExcelExport = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, 'table.xlsx');
  };

  return (
    <div>
      <button onClick={handlePDFExport}>Export to PDF</button>
      <button onClick={handleExcelExport}>Export to Excel</button>
      <CSVLink data={data} filename="table.csv">
        <button>Export to CSV</button>
      </CSVLink>

      <table {...getTableProps()} id="table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
      </div>
      <div>
        <span>Page {pageIndex + 1} of {Math.ceil(rows.length / pageSize)}</span>
        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 15, 20].map(size => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DataTable;
