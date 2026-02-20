import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
// https://www.giftofspeed.com/base64-encoder/
const generateOrderPDF = (order) => {
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString();

  //  margin
  const margin = 10;
  doc.setFontSize(18);
  doc.text(order.company, margin, margin + 10);
  doc.setFontSize(12);
  doc.text(`Date: ${order.date}`, margin, margin + 20);

  // width of page
  const pageWidth = doc.internal.pageSize.getWidth();
  const tableWidth = pageWidth - margin * 2;

  // columns
  const columns = [
    { header: "Name", dataKey: "name" },
    { header: "Quantity", dataKey: "quantity" },
    { header: "Price", dataKey: "price" },
  ];

  //  data
  const body = order.products.map((product) => ({
    name: product.name,
    quantity: product.quantity,
    price: `$${product.unitPrice.toFixed(2)}`,
  }));

  //  total
  const total = order.products.reduce((sum, p) => sum + p.unitPrice, 0);
  body.push({
    name: "TOTAL",
    quantity: "",
    price: `$${total.toFixed(2)}`,
  });

  //  create table
  autoTable(doc, {
    startY: margin + 25,
    head: [columns.map((c) => c.header)],
    body: body.map((row) => columns.map((c) => row[c.dataKey])),
    theme: "grid",
    tableWidth: tableWidth, // تحديد العرض الكامل
    margin: { left: margin, right: margin },
    styles: {
      fontSize: 10,
      cellPadding: 3,
      overflow: "linebreak", // منع تجاوز النص
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontStyle: "bold",
    },
    columnStyles: {
      0: { cellWidth: "auto" },
      1: { cellWidth: "auto" },
      2: { cellWidth: "auto" },
    },
  });

  doc.save(`order-${date}.pdf`);
};

export default generateOrderPDF;
