import React, { useCallback, useState } from "react";
// import * as ReactDOM from "react-dom";
import {
  Grid,
  GridColumn as Column
} from "@progress/kendo-react-grid";
import {process } from "@progress/kendo-data-query";

const products = require("../../../src/userDb.json");

const initialDataState = {}

const DataGridPage:React.FC = () => {
  const [dataState,setDataState] = useState()
  const [resultState,setResultState] = useState(process(products,initialDataState))

  const onDataStateChange = useCallback((e)=>{
    setDataState(e.dataState)
    setResultState(process(products,e.dataState))
  },[])
  return (
    <>
      <div className="data-grid-page">
        <Grid
          style={{
            height: "300px",
          }}
          data={{data:resultState.data}}
          sortable={true}
          filterable={true}
          onDataStateChange={onDataStateChange}{...dataState}
        >
          <Column field="userName" title="USERNAME"filterable={false}/>
          <Column field="fullName" title="FULLNAME" />
          <Column field="lastLogin" title="LAST LOG IN" filterable={false} />
          <Column field="enabled" title="ENABLED" filterable={false} />
        </Grid>
      </div>
    </>
  );
};
export default DataGridPage;
document.querySelector("my-app");
