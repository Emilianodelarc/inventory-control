import React from "react";

const InventoryTable = ({ inventory, updateQuantity }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Código de Barra</th>
          <th>Nombre del Producto</th>
          <th>Cantidad</th>
        </tr>
      </thead>
      <tbody>
        {inventory.map((item, index) => (
          <tr key={index}>
            <td>{item.barcode}</td>
            <td>{item.name || "Producto Desconocido"}</td>
            <td>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateQuantity(index, e.target.value)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventoryTable;
