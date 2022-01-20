import React, { useCallback, useState } from "react";
import NewUserDialogue from "./newUserDialogue";
import TimeStamp from "./timeStamp";
import {
  Grid,
  GridColumn as Column,
  GridCellProps,
  GRID_COL_INDEX_ATTRIBUTE,
} from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import { useTableKeyboardNavigation } from "@progress/kendo-react-data-tools";
import { Users,  } from "../userStore";
import { observer } from "mobx-react";
import PageTwo from "../page-two/pageTwo"

interface item {
  color: string;
}

interface CusostmCellProps extends GridCellProps {
  myProp: Array<item>;
}

const userDb: (
  | string
  | number
  | boolean
  | {}
)[] = require("../../../src/userDb.json");

type userDbType = typeof userDb;

const CustomeCell = (props: CusostmCellProps) => {
  let enabler: any;
  const field = props.field || "";
  const value = props.dataItem[field];
  if (value) {
    enabler = "Yes";
  } else {
    enabler = "No";
  }
  const navigationAttributes = useTableKeyboardNavigation(props.id);
  return (
    <>
      <td
        style={{ color: value ? props.myProp[0].color : props.myProp[1].color }}
        colSpan={props.colSpan}
        role={"gridcell"}
        aria-colindex={props.ariaColumnIndex}
        aria-selected={props.isSelected}
        {...{ [GRID_COL_INDEX_ATTRIBUTE]: props.columnIndex }}
        {...navigationAttributes}
      >
        {value === null ? "" : enabler}
      </td>
    </>
  );
};

const customData: Array<any> = [{ color: "black" }, { color: "red" }];

const MyCustomCell = (props: GridCellProps) => (
  <CustomeCell {...props} myProp={customData} />
);

const initialDataState = {};

const DataGridPage: React.FC = observer(() => {
  TimeStamp();
  const [dataState, setDataState] = useState();
  const [userDbHolder, setUserDbHolder] = useState<userDbType>(Users.users);
  const [resultState, setResultState] = useState(
    process(Users.users, initialDataState)
  );

  const onDataStateChange = useCallback((e) => {
    setDataState(e.dataState);
    setResultState(process(Users.users, e.dataState));
  }, []);
  return (
    <>
      <div className="data-grid-page">
        <div>
          <div style={{padding:"12px"}}>
            <NewUserDialogue
              usersList={Users}
              commingInState={setUserDbHolder}
            />
          </div>
        </div>
        <div style={{padding:"12px"}}>
          <Grid
            style={{
              height: "300px",
            }}
            data={{ data: resultState.data }}
            sortable={true}
            filterable={true}
            onDataStateChange={onDataStateChange}
            {...dataState}
          >
            <Column field="userName" title="USERNAME" filterable={false} />
            <Column field="fullName" title="FULLNAME" />
            <Column field="lastLogIn" title="LAST LOG IN" filterable={false} />
            <Column
              field="enabled"
              title="ENABLED"
              filterable={false}
              cell={MyCustomCell}
            />
          </Grid>
        </div>
      </div>
    </>
  );
});
export default DataGridPage;
document.querySelector("my-app");
