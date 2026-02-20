// react
import { useState, useContext, useCallback } from "react";
// data
import { OrdersContext } from "../../../contexts/Orders";
import { ProductsContext } from "../../../contexts/Products";
// utils
import generateOrderPDF from "../../../utils/orderpdfGenerator";
// main
export const useOrderManagement = () => {
  // حالة البحث والتصفية
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // حالة الإشعارات
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // حالة الحوارات
  const [dialogState, setDialogState] = useState({
    deleteDialogOpen: false,
    statusDialogOpen: false,
  });

  // حالة الطلب المحدد
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // السياق
  const { ordersData, setOrdersData } = useContext(OrdersContext);
  const { setProductsData } = useContext(ProductsContext);

  // تصفية الطلبات
  const filteredOrders = ordersData.filter((order) => {
    const searchMatch = order.company
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const filterMatch =
      filter === "all" ||
      (filter === "completed" && order.status === "completed") ||
      (filter === "pending" && order.status === "pending");
    return searchMatch && filterMatch;
  });

  // التعامل مع الطباعة
  const handlePrint = useCallback((order) => {
    generateOrderPDF(order);
  }, []);

  // التعامل مع الحذف
  const handleDelete = useCallback((orderId) => {
    setSelectedOrderId(orderId);
    setDialogState((prev) => ({ ...prev, deleteDialogOpen: true }));
  }, []);

  const confirmDelete = useCallback(() => {
    setOrdersData((prevOrders) =>
      prevOrders.filter((order) => order.id !== selectedOrderId)
    );
    setDialogState((prev) => ({ ...prev, deleteDialogOpen: false }));
    setSnackbarState({
      open: true,
      message: "تم حذف الطلب بنجاح",
      severity: "success",
    });
  }, [selectedOrderId, setOrdersData]);

  // التعامل مع تغيير الحالة
  const handleStatusChange = useCallback(
    (orderId) => {
      const order = ordersData.find((order) => order.id === orderId);

      if (!order) return;

      if (order.status !== "pending") {
        setSnackbarState({
          open: true,
          message: "لا يمكن تغيير حالة الطلب المستلم",
          severity: "error",
        });
        return;
      }

      setSelectedOrderId(orderId);
      setDialogState((prev) => ({ ...prev, statusDialogOpen: true }));
    },
    [ordersData]
  );

  const confirmStatusChange = useCallback(() => {
    const orderToProcess = ordersData.find(
      (order) => order.id === selectedOrderId
    );

    if (!orderToProcess || orderToProcess.status !== "pending") {
      setSnackbarState({
        open: true,
        message: "لا يمكن التراجع عن الطلب المستلم.",
        severity: "error",
      });
      setDialogState((prev) => ({ ...prev, statusDialogOpen: false }));
      return;
    }

    // معالجة المنتجات من الطلب
    setProductsData((prevProducts) => {
      const updatedProducts = JSON.parse(JSON.stringify(prevProducts));

      orderToProcess.products.forEach((orderProduct) => {
        const orderQuantity = Number(orderProduct.quantity);
        const existingIndex = updatedProducts.findIndex(
          (p) => p.id === orderProduct.id
        );

        if (existingIndex > -1) {
          updatedProducts[existingIndex].quantity += orderQuantity;
        } else {
          updatedProducts.push({
            id: orderProduct.id,
            name: orderProduct.name,
            image: orderProduct.image,
            price: orderProduct.unitPrice,
            validity: orderProduct.validity,
            details: orderProduct.details,
            company: orderProduct.company,
            quantity: orderQuantity,
            production_date: new Date().toISOString().split("T")[0],
          });
        }
      });

      return updatedProducts;
    });

    // تحديث حالة الطلب
    setOrdersData((prevOrders) =>
      prevOrders.map((order) =>
        order.id === selectedOrderId ? { ...order, status: "completed" } : order
      )
    );

    setSnackbarState({
      open: true,
      message: "تم استلام الطلب وإضافة المنتجات",
      severity: "success",
    });
    setDialogState((prev) => ({ ...prev, statusDialogOpen: false }));
  }, [selectedOrderId, ordersData, setOrdersData, setProductsData]);

  return {
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
    snackbarState,
    setSnackbarState,
    dialogState,
    setDialogState,
    selectedOrderId,
    setSelectedOrderId,
    filteredOrders,
    handleDelete,
    handleStatusChange,
    confirmDelete,
    confirmStatusChange,
    handlePrint,
  };
};
