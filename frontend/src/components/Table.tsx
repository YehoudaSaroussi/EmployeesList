import React from 'react';
import './Table.css'; // Import the CSS file for styling

interface TableProps {
  headers: string[];
  rows: React.ReactNode[][];
}

const Table: React.FC<TableProps> = ({ headers, rows }) => {
  return (
    <table className="table">
      <thead>
        <tr className="table-header-row">
          {headers.map((header, index) => (
            <th key={index} className="table-header-cell">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className={`table-body-row ${rowIndex % 2 === 0 ? 'table-row-even' : 'table-row-odd'}`}
          >
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="table-body-cell">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
