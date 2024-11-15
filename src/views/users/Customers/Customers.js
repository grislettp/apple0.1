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



const ListCustomers = () => {
  // Establecer el estado para los empleados
  const [employees, setEmployees] = useState([]);

  // Cargar los datos del archivo JSON
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/db.json'); // Asegúrate de que la ruta es correcta
        const data = await response.json();

        // Filtrar solo los empleados donde CodRol === 2 (Clientes)
        const admins = data.tmausu.filter(employee => employee.CodRol === 2);
        
        // Establecer solo los administradores en el estado
        setEmployees(admins);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    };

    fetchData();
  }, []); // El segundo parámetro vacío asegura que solo se ejecute una vez al cargar el componente

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Customers List</strong>
          </CCardHeader>
          <CCardBody>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">First Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {employees.length > 0 ? (
                  employees.map((employee) => (
                    <CTableRow key={employee.CedUsu}>
                      <CTableDataCell>{employee.CedUsu}</CTableDataCell>
                      <CTableDataCell>{employee.NomUsu}</CTableDataCell>
                      <CTableDataCell>{employee.ApeUsu}</CTableDataCell>
                      <CTableDataCell>
                      <CButton color="danger">
                    {/* <CIcon icon={cilBell} className="me-2" />  */}
                          Delete
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>
                      <CButton color="primary">
                    {/* <CIcon icon={cilBell} className="me-2" />  */}
                          Show more
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan="4" className="text-center">
                      No employees found
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

export default ListCustomers


