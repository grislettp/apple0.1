import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'

const ListOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/db.json');
        const data = await response.json();

        // Procesamos las órdenes (tmacar) y calculamos el total
        const ordersData = data.tmacar.map((order) => {
          // Encontrar el nombre del proveedor (Supplier)
          const supplier = data.tmausu.find((user) => user.CodUsu === order.CodSup);

          // Calcular el total de la orden
          const orderProducts = data.ttedcar.filter((detail) => detail.CodCar === order.CodCar);
          const totalOrder = orderProducts.reduce((total, product) => total + product.TotPro, 0);

          // Encontrar el método de pago
          const paymentMethod = data.tmetpa.find((payment) => payment.CodTpa === order.CodTpa);

          return {
            ...order,
            SupplierName: supplier ? `${supplier.NomUsu} ${supplier.ApeUsu}` : 'Unknown Supplier',
            totalOrder,
            paymentMethod: paymentMethod ? paymentMethod.NomTpa : 'Unknown',
            orderProducts,
          };
        });

        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Función para mostrar el modal con los detalles de la orden
  const showOrderDetails = (CodCar) => {
    fetch('/data/db.json')
      .then((response) => response.json())
      .then((data) => {
        // Filtrar los detalles de la orden en ttedcar usando CodCar
        const orderItems = data.ttedcar.filter((item) => item.CodCar === CodCar);
        
        // Agregar información adicional del producto
        const orderDetails = orderItems.map((item) => {
          const product = data.tmapro.find((prod) => prod.CodPro === item.CodPro);
          return {
            ...item,
            productName: product ? product.NomPro : 'Unknown Product',
          };
        });

        setSelectedOrderDetails({
          CodCar,
          orderDetails,
        });
        setVisible(true); // Abrir el modal
      })
      .catch((error) => console.error('Error loading order details:', error));
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Order List</strong>
          </CCardHeader>
          <CCardBody>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Order Code</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Supplier</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Order Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Total</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Payment Method</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <CTableRow key={order.CodCar}>
                      <CTableDataCell>{order.CodCar}</CTableDataCell>
                      <CTableDataCell>{order.SupplierName}</CTableDataCell>
                      <CTableDataCell>{order.FecCar}</CTableDataCell>
                      <CTableDataCell>${order.totalOrder.toFixed(2)}</CTableDataCell>
                      <CTableDataCell>{order.paymentMethod}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color="primary" onClick={() => showOrderDetails(order.CodCar)}>
                          Show More
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan="6" className="text-center">
                      No orders found
                    </CTableDataCell>
                  </CTableRow>
                )}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      {/* Modal para mostrar detalles de la orden */}
      {selectedOrderDetails && (
        <CModal visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle>Order Details (Order #{selectedOrderDetails.CodCar})</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Product Name</CTableHeaderCell>
                  <CTableHeaderCell>Quantity</CTableHeaderCell>
                  <CTableHeaderCell>Total</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {selectedOrderDetails.orderDetails.map((item, idx) => (
                  <CTableRow key={idx}>
                    <CTableDataCell>{item.productName}</CTableDataCell>
                    <CTableDataCell>{item.CanPro}</CTableDataCell>
                    <CTableDataCell>${item.TotPro.toFixed(2)}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      )}
    </CRow>
  );
};

export default ListOrders;
