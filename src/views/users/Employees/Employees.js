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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
} from '@coreui/react'

// Componente para agregar un nuevo empleado
const AddEmployeeModal = ({ visible, setVisible, addEmployee }) => {
  const [newEmployee, setNewEmployee] = useState({
    CodUsu: '',
    CedUsu: '',
    NomUsu: '',
    ApeUsu: '',
    ConUsu: '',
    CodRol: 1,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewEmployee({ ...newEmployee, [name]: value })
  }

  const handleSubmit = () => {
    addEmployee(newEmployee)
    setVisible(false)
    setNewEmployee({ CodUsu: '', CedUsu: '', NomUsu: '', ApeUsu: '', ConUsu: '', CodRol: 1 })
  }

  return (
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>Add New Employee</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
        <div className="mb-3">
            <CFormInput
              type="number"
              name="CodUsu"
              label="Cod"
              placeholder="Cod Employee"
              value={newEmployee.CodUsu}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <CFormInput
              type="number"
              name="CedUsu"
              label="ID"
              placeholder="Employee ID"
              value={newEmployee.CedUsu}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <CFormInput
              type="text"
              name="NomUsu"
              label="First Name"
              placeholder="First Name"
              value={newEmployee.NomUsu}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <CFormInput
              type="text"
              name="ApeUsu"
              label="Last Name"
              placeholder="Last Name"
              value={newEmployee.ApeUsu}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <CFormInput
              type="password"
              name="ConUsu"
              label="Password"
              placeholder="Password"
              value={newEmployee.ConUsu}
              onChange={handleChange}
            />
          </div>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Close
        </CButton>
        <CButton color="primary" onClick={handleSubmit}>
          Save Employee
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

// Componente principal para listar empleados
const ListEmployees = () => {
  const [employees, setEmployees] = useState([])
  const [visible, setVisible] = useState(false)

  // Cargar los datos del archivo JSON
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/db.json')
        const data = await response.json()
        const admins = data.tmausu.filter((employee) => employee.CodRol === 1)
        setEmployees(admins)
      } catch (error) {
        console.error('Error al cargar los datos:', error)
      }
    }

    fetchData()
  }, [])

  // Agregar nuevo empleado al estado actual
  const addEmployee = (newEmployee) => {
    setEmployees([...employees, newEmployee])
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Employee List</strong>
          </CCardHeader>
          <CCardBody>
            {/* Botón para abrir el modal de añadir empleado */}
            <CButton color="primary" onClick={() => setVisible(true)}>
              Add New Employee
            </CButton>

            {/* Modal para agregar nuevo empleado */}
            <AddEmployeeModal visible={visible} setVisible={setVisible} addEmployee={addEmployee} />

            <CTable striped>
              <CTableHead>
                <CTableRow>
           
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">First Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
                
                  <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {employees.length > 0 ? (
                  employees.map((employee) => (
                    <CTableRow key={employee.CodUsu}>
                      <CTableDataCell>{employee.CedUsu}</CTableDataCell>
                      <CTableDataCell>{employee.NomUsu}</CTableDataCell>
                      <CTableDataCell>{employee.ApeUsu}</CTableDataCell>
                   
                      <CTableDataCell>
                        <CButton color="danger">Delete</CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan="5" className="text-center">
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
  )
}

export default ListEmployees
