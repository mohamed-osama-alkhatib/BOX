// react
import { useState, useContext, useEffect } from "react";
// @mui/material
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
// data
import { OrdersContext } from "../../../contexts/Orders";
import { OpenCartModelContext } from "../../../contexts/OpenModel";
import { ShoppingCartContext } from "../../../contexts/ShoppingCart";
import { ProductsOfCompaniesContext } from "../../../contexts/ProductsOfCompanies";
// date-fns
import { format } from "date-fns";
import { arSA } from "date-fns/locale";

// modal
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { sx: 400, md: 600 },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  direction: "rtl",
};

function ShoppingCart({ companyName, onOrderSubmit, onOrderCancel }) {
  const { openCartModel, setOpenCartModel } = useContext(OpenCartModelContext);
  const { setOrdersData } = useContext(OrdersContext);
  const { cart, setCart } = useContext(ShoppingCartContext);
  const { cproductsData } = useContext(ProductsOfCompaniesContext);
  const [formData, setFormData] = useState({
    company: companyName,
    date: "",
  });

  const mergedCart = cart
    .map((cartItem) => {
      const product = cproductsData.find((p) => p.id === cartItem.productId);
      if (!product) return null;
      return {
        id: product.id,
        image: product.image,
        name: product.name,
        unitPrice: product.price,
        validity: product.validity,
        details: product.details,
        company: product.company,
        quantity: cartItem.quantity,
      };
    })
    .filter((item) => item !== null);

  useEffect(() => {
    const today = new Date();
    const formattedDate = format(today, "EEEE - yyyy/M/d", { locale: arSA });
    setFormData((prev) => ({
      ...prev,
      date: formattedDate,
      company: companyName,
    }));
  }, [companyName]);

  const totalAmount = mergedCart.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const handleSubmit = () => {
    const newOrder = {
      id: Date.now(),
      company: formData.company,
      date: formData.date,
      status: "pending",
      products: mergedCart.map((item) => ({
        id: item.id,
        image: item.image,
        name: item.name,
        unitPrice: item.unitPrice,
        validity: item.validity,
        details: item.details,
        company: item.company,
        quantity: item.quantity,
      })),
      total: totalAmount,
    };

    setOrdersData((prev) => [...prev, newOrder]);
    setCart([]);
    setOpenCartModel(false);
    onOrderSubmit();
  };

  const handleCancel = () => {
    setOpenCartModel(false);
    onOrderCancel();
  };

  return (
    <Modal open={openCartModel} onClose={() => setOpenCartModel(false)}>
      <Box sx={modalStyle}>
        <Typography variant="h6" gutterBottom align="right">
          طلب شراء لـ {companyName}
        </Typography>

        <Typography variant="body1" gutterBottom sx={{ mt: 2 }} align="right">
          تاريخ الطلب: {formData.date}
        </Typography>

        <TableContainer sx={{ maxHeight: 300, mt: 2 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right">المنتج</TableCell>
                <TableCell align="right">الكمية</TableCell>
                <TableCell align="right">سعر الوحدة</TableCell>
                <TableCell align="right">الإجمالي</TableCell>
              </TableRow>
              {mergedCart.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Avatar
                      variant="square"
                      src={item.image}
                      sx={{ width: 56, height: 56 }}
                    />
                  </TableCell>
                  <TableCell align="right">{item.name}</TableCell>
                  <TableCell align="right">x{item.quantity}</TableCell>
                  <TableCell align="right">
                    {Number(item.unitPrice).toLocaleString("en-SY", {
                      style: "currency",
                      currency: "SYP",
                    })}
                  </TableCell>
                  <TableCell align="right">
                    {(item.unitPrice * item.quantity).toLocaleString("en-SY", {
                      style: "currency",
                      currency: "SYP",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h6" sx={{ mt: 2, textAlign: "right" }}>
          الإجمالي:
          {totalAmount.toLocaleString("en-SY", {
            style: "currency",
            currency: "SYP",
          })}
        </Typography>

        <Box
          sx={{ display: "flex", justifyContent: "flex-start", gap: 2, mt: 3 }}
        >
          <Button variant="outlined" onClick={handleCancel}>
            إلغاء
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={mergedCart.length === 0}
          >
            إرسال الطلب
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
export default ShoppingCart;
