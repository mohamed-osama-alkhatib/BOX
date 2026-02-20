import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const generatePDF = (cartItems, customer) => {
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString();
  const invoiceId = Date.now(); // Generate unique ID using timestamp
  const fileName = `invoice-${invoiceId}-${customer.replace(/\s+/g, "-")}.pdf`;
  const filePath = `/invoices_issued/${fileName}`;

  doc.setFontSize(18);
  doc.text("INVOICE", 105, 20, { align: "center" });
  doc.setFontSize(12);
  doc.text(`Invoice ID: ${invoiceId}`, 15, 30);
  doc.text(`Date: ${date}`, 15, 40);
  doc.text(`Customer: ${customer}`, 15, 50);

  const columns = ["Product", "Unit Price", "Quantity", "Total"];
  const rows = cartItems.map((item) => [
    item.name,
    `$${Number(item.price).toFixed(2)}`,
    item.quantity,
    `$${(Number(item.price) * item.quantity).toFixed(2)}`,
  ]);

  autoTable(doc, {
    head: [columns],
    body: rows,
    startY: 60,
    theme: "grid",
    styles: { fontSize: 10 },
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
  });

  const finalY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(14);
  doc.text(
    `Total Amount: $${cartItems
      .reduce((total, item) => total + Number(item.price) * item.quantity, 0)
      .toFixed(2)}`,
    15,
    finalY
  );
  doc.save(fileName);

  return {
    invoiceId: invoiceId,
    customerName: customer,
    date: date,
    filePath: filePath,
  };
};
