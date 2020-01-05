import React from "react";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import CustomInput from "components/CustomInput/CustomInput.js";
// core components
import Button from "components/CustomButtons/Button.js";
import TextField from "@material-ui/core/TextField";
import modalStyle from "assets/jss/material-kit-react/modalStyle";
import Select from '@material-ui/core/Select';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Input from '@material-ui/core/Input';
const useStyles = makeStyles(theme => ({
  root: {},
  formControl: {
    margin: 0,
    fullWidth: true,
    display: "flex",
    wrap: "nowrap",
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Modal(props) {
  const [modal, setModal] = React.useState(false);
  const classes = useStyles();

  let ingredients = [];
  ingredients = props.ingredients.map((ingredient, i) => {
    return (
      <div key={i} style={{ display: "inline-block" }}>
        <p
          style={{
            display: "inline-block",
            cursor: "pointer",
            color: "red"
          }}
          onClick={props.remove(i)}
        >
          X
        </p>
        <p style={{ display: "inline-block" }}>{ingredient}</p>
        &nbsp;
      </div>
    );
  });
  let isIngredientAdded = false;
  if (ingredients == "") {
    isIngredientAdded = false;
  } else {
    isIngredientAdded = true;
  }
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-multiple">Your Skills and Awards</InputLabel>
       <Select
          labelId="Skills and Awards"
          id="demo-mutiple-name"
          multiple
          value={props.ingredients}
          onClick={() => setModal(true)}
          input={<Input />}
          formControlProps={{
            fullWidth: true,
          }}
          disabled={true}
          style={{ width:'100%' }}
        >
          {props.ingredients.map(name => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal
        }}
        open={modal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setModal(false)}
        aria-labelledby="modal-slide-title"
        aria-describedby="modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
         
          <h4 className={classes.modalTitle}>Add Skills and Awards</h4>
        </DialogTitle>
        <DialogContent
          id="modal-slide-description"
          className={classes.modalBody}
        >
          <CustomInput
            labelText=""
            onChange={props.handleChange()}
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "text",
              name: "ingredientsText",
              value: props.ingredientsText,
              onKeyPress: props.handleKeyPress
            }}
          />
          <Button onClick={props.handleMultiInputs()} color="success">
            Add
          </Button>
          <br />
          <br />
          {ingredients}
        </DialogContent>
        <DialogActions
          className={classes.modalFooter + " " + classes.modalFooterCenter}
        >
          <Button onClick={() => setModal(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
