import React, { useState } from "react";
// import * as ReactDOM from "react-dom";
import {
  Grid,
  GridColumn as Column,
  GridSortChangeEvent,
} from "@progress/kendo-react-grid";
import { orderBy, SortDescriptor } from "@progress/kendo-data-query";

const products = require("../../../src/products.json");

const initialSort: Array<SortDescriptor> = [
  { field: "ProductName", dir: "asc" },
];

const DataGridPage:React.FC = () => {
  const [sort, setSort] = useState(initialSort);
  return (
    <>
      <div className="data-grid-page">
        <Grid
          style={{
            height: "300px",
          }}
          data={orderBy(products, sort)}
          sortable={true}
          sort={sort}
          onSortChange={(e: GridSortChangeEvent) => {
            setSort(e.sort);
          }}
        >
          <Column field="ProductID" />
          <Column field="ProductName" title="Product Name" />
          <Column field="UnitPrice" title="Unit Price" />
        </Grid>
      </div>
    </>
  );
};
export default DataGridPage;
document.querySelector("my-app");
