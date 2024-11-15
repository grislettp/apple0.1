import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell } from '@coreui/icons'



const ListSales = () => {
  const [salesData, setSalesData] = useState([]); // Estado para almacenar los datos combinados

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/db.json'); // Asegúrate de que la ruta sea correcta
        const data = await response.json();

        // Unir las tablas para obtener la información de ventas, trabajador, cliente, fecha y total
        const salesWithDetails = data.ventas.map((sale) => {
          const saleDetail = data.tmafac.find((fac) => fac.CodFac === sale.CodFac);
          const employee = data.tmausu.find((user) => user.CedUsu === saleDetail.CedUsu); // Quién hizo la venta
          const customer = data.tmausu.find((user) => user.CedUsu === sale.CedUsu); // Quién hizo la compra

          return {
            ...sale,
            employeeName: employee ? `${employee.NomUsu} ${employee.ApeUsu}` : 'Unknown',
            customerName: customer ? `${customer.NomUsu} ${customer.ApeUsu}` : 'Unknown',
            saleDetail: saleDetail || {},
          };
        });

        setSalesData(salesWithDetails); // Establecer los datos combinados en el estado
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Sales List</strong>
          </CCardHeader>
          <CCardBody>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Employee</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Customer</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Sale Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Total</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {salesData.length > 0 ? (
                  salesData.map((sale, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{sale.employeeName}</CTableDataCell>
                      <CTableDataCell>{sale.customerName}</CTableDataCell>
                      <CTableDataCell>{sale.saleDetail.FecFac}</CTableDataCell>
                      <CTableDataCell>{sale.saleDetail.SubFac}</CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan="4" className="text-center">
                      No sales found
                    </CTableDataCell>
                  </CTableRow>
                )}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};


export default ListSales




