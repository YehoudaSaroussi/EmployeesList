import React from 'react';

interface TableProps {
  headers: string[];
  rows: React.ReactNode[][];
}

const Table: React.FC<TableProps> = ({ headers, rows }) => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
      <thead>
        <tr style={{ backgroundColor: '#4CAF50', color: '#fff' }}>
          {headers.map((header, index) => (
            <th key={index} style={{ padding: 12, textAlign: 'left' }}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            style={{
              backgroundColor: rowIndex % 2 === 0 ? '#f9f9f9' : '#fff',
              borderBottom: '1px solid #ddd',
            }}
          >
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} style={{ padding: 12 }}>
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
