import React, { useState } from "react";
import styled from "styled-components";

const Table = ({
  headers = [],
  keys = [],
  contents = [],
  footer = [],
  keyPrefix = "table",
  color = "#00CCFF",
  textColor = "#FFFFFF",
  ...props
}) => {
  const [tableContents, setTableContents] = useState(contents);
  const [order, setOrder] = useState('');

  

  const tableReorder = (i) =>{
    if(order){
      const newOrder = order==='asc'? 'desc' : 'asc';
      setOrder(newOrder);
    }else{
      setOrder('asc');
    }
    if(tableContents && tableContents[0]){
      const orderedContents = [...contents.sort((a, b) => {
        let condition = a[keys[i]] >= b[keys[i]];
        if(order==='desc'){
         condition = a[keys[i]] <= b[keys[i]];
        }
          if (condition) {
            return 1;
          } else return -1;
        })];
      setTableContents(orderedContents);
      console.log(tableContents);
    }
  }
 




  return (
    <StyledTable color={color} textColor={textColor}>
      <table {...props}>
        {headers.length > 0 && (
          <thead>
            <tr>
              {headers.map((header, i) => (
                <th onClick={()=>tableReorder(i)} key={`${keyPrefix}-header-${i}`}>{header}</th>
              ))}
            </tr>
          </thead>
        )}
        {tableContents.length > 0 && keys.length > 0 && (
          <tbody>
            {tableContents
              .map((row, i) => (
                <tr key={`${keyPrefix}-row-${i}`}>
                  {keys.map((key, i) => (
                    <td data-th={headers[i] ? `${headers[i]}:` : null} key={`${keyPrefix}-data-${row.table_key}`}>{row[key]}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        )}
        {footer.length > 0 && (
          <tfoot>
            {footer.map((row) => (
              <tr>
                {row.map((data, i) => (
                  <td  key={`${keyPrefix}-footer-${i}`}>{data}</td>
                ))}
              </tr>
            ))}
          </tfoot>
        )}
      </table>
    </StyledTable>
  );
};

const StyledTable = styled.div.attrs((props) => ({
  color: props.color,
  textColor: props.textColor,
}))`
  display: flex;
  text-align: center;
  table {
    flex-grow: 100;
    border-collapse: collapse;
    thead {
      display: none;
    }
    tbody {
      tr {
        :nth-child(even) {
          background-color: ${(props) => props.color};
          color: ${(props) => props.textColor};
        }
        td {
          display: flex;
          padding: 0.4rem 1rem;
          justify-content: space-between;
          ::before{
            min-width: 20%;
            text-align: left;
            content: attr(data-th);
            font-weight: bold;
          }
        }
        
        :last-child {
          border-bottom: 0.2rem solid ${(props) => props.color};
        }

        :first-child {
          border-top: 0.2rem solid ${(props) => props.color};
        }
      }
    }
    @media (min-width: 768px){
      thead{
        display: table-header-group;
        th {
          border-top: 0.2rem solid ${(props) => props.color};
          border-bottom: 0.1rem solid ${(props) => props.color};
          padding: 0.6rem;
          cursor: pointer;
          :hover{
            color: ${(props) => props.color}; 
          }
        }
      }
      tbody{
        tr{
          td{
            display: table-cell;
            :not(:first-child) {
              border-left: 0.1rem solid ${(props) => props.color};
            }
            ::before{
               display: none;
            }
          }
          :first-child {
            border: none;
          }
        }
      }   
    }
  }
`;

export default Table;
