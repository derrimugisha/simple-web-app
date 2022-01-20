import React, { useState, useRef,RefObject } from "react";
import { Window } from "@progress/kendo-react-dialogs";
import { Checkbox } from "@progress/kendo-react-inputs";
import { UserStore } from "../userStore";
import { observer } from "mobx-react";
import TimeStamp from "../page-one/timeStamp";
interface UsersListProps {
  usersList: UserStore;
  commingInState?: any;
}

interface dataUser {
  id: number;
  userName: string;
  fullName: string;
  lastLogIn: number;
  enabled: boolean;
}

interface ButtonChecked {
  yesButton: boolean;
  noButton: boolean;
  btnStatus?: boolean;
}


const NewUserDialogue: React.FC<UsersListProps> = observer(({ usersList }) => {

  const addForm = useRef<HTMLFormElement>(null);

  const [clickedbutton, setClickedButton] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [checkedButton, setCheckedButton] = useState<ButtonChecked>({
    yesButton: true,
    noButton: false,
    btnStatus: true,
  });

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const checkedChanger = () => {
    let yes = checkedButton.yesButton;
    let no = checkedButton.noButton;
    let status = checkedButton.btnStatus;
    if (yes) {
      setCheckedButton({ yesButton: false, noButton: true });
      setClickedButton(false);
    }
    if (no) {
      setCheckedButton({ yesButton: true, noButton: false });
      setClickedButton(true);
    }
  };

  const submitButton = () => {
    const form = addForm.current;
    const myTime = TimeStamp();
    console.log(`this is the time:::${myTime}`)
    if(form !==null){
      let id = +Math.random().toFixed(4);
    const firstName = form["firstName"].value;
    const lastName = form["lastName"].value;
    const fullName = `${firstName} ${lastName}`;
    const userName = `${firstName}${lastName}`;
    const lastLogIn = myTime;
    const enabled = clickedbutton;
    let dataObject = { id, fullName, userName, lastLogIn, enabled };
     //Using mobx to change data in the table
     usersList.addUser(dataObject);
    }  
  };

  return (
    <div>
      <button
        className="k-button"
        background-color="blue"
        onClick={toggleDialog}
      >
        Add User
      </button>
      {visible && (
        <Window
          title={"Create new user"}
          onClose={toggleDialog}
          initialHeight={350}
        >
          <form className="k-form" ref={addForm}>
            <fieldset>
              <legend>User Details</legend>

              <label className="k-form-field">
                <span>First Name</span>
                <input
                  className="k-textbox"
                  placeholder="Your Name"
                  name={"firstName"}
                />
              </label>
              <label className="k-form-field">
                <span>Last Name</span>
                <input
                  className="k-textbox"
                  placeholder="Your Last Name"
                  name={"lastName"}
                />
              </label>

              <label className="k-form-field">
                <span>Enabled</span>
                <div style={{ display: "flex", flexWrap: "nowrap" }}>
                  <span style={{ marginLeft: "1em", marginRight: "1em" }}>
                    <p>
                      <Checkbox
                        checked={checkedButton.yesButton}
                        label={"Yes"}
                        onClick={checkedChanger}
                        name={"yes"}
                      />
                    </p>
                  </span>

                  <span style={{ marginLeft: "1em", marginRight: "1em" }}>
                    <p>
                      <Checkbox
                        checked={checkedButton.noButton}
                        label={"No"}
                        onClick={checkedChanger}
                        name={"No"}
                      />
                    </p>
                  </span>
                </div>
              </label>
            </fieldset>

            <div className="text-right">
              <button type="button" className="k-button" onClick={toggleDialog}>
                Cancel
              </button>
              <button
                type="button"
                className="k-button k-primary"
                onClick={submitButton}
              >
                Submit
              </button>
            </div>
          </form>
        </Window>
      )}
    </div>
  );
});
export default NewUserDialogue;
