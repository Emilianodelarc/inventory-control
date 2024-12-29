import React, { useState } from "react";
import ScannerComponent from "./components/ScannerComponent";
import InventoryTable from "./components/InventoryTable";
import ExportToExcel from "./components/ExportToExcel";

const App = () => {
  const [inventory, setInventory] = useState([]);

  const handleScan = (barcode) => {
    setInventory((prev) => {
      const exists = prev.find((item) => item.barcode === barcode);
      if (exists) {
        return prev.map((item) =>
          item.barcode === barcode
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { barcode, name: "", quantity: 1 }];
    });
  };

  const updateQuantity = (index, quantity) => {
    setInventory((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, quantity: parseInt(quantity) || 0 } : item
      )
    );
  };
console.log(inventory);

  return (
    <div>
      <h1>Control de Inventario</h1>
      <ScannerComponent onScan={handleScan} />
      <InventoryTable inventory={inventory} updateQuantity={updateQuantity} />
      <ExportToExcel data={inventory} fileName="Inventario" />
    </div>
  );
};

export default App;
