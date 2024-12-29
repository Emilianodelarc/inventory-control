import React from "react";
import * as XLSX from "xlsx";

const ExportToExcel = ({ data, fileName }) => {
  const exportFile = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventario");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  return <button onClick={exportFile}>Exportar a Excel</button>;
};

export default ExportToExcel;
