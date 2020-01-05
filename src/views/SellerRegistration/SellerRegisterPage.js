import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Modal from 'components/Modals/Modal';
import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

export default function SellerRegisterPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const {  onChange, onSubmit,  errors,fields, ...rest } = props;
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Flutag"
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="success" className={classes.cardHeader}>
                    <h4>Register as Seller</h4>
                    <Icon >
                              lock_outline
                            </Icon>
                  </CardHeader>
                 
                  <CardBody>
                 
                    <CustomInput
                      labelText="Please enter your experiance"
                      id="email"
                      onChange={onChange}
                      errorText={errors.seller_experiance}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        name: "seller_experience",
                       
                      }}
                    />
                    <CustomInput
                      labelText="Please tell the community about yourself"
                      id="email"
                      onChange={onChange}
                      errorText={errors.seller_description}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        name: "seller_description",
                       
                      }}
                    />
                     <CustomInput
                      labelText="Please enter the langauages you speak"
                      id="email"
                      onChange={onChange}
                      errorText={errors.seller_language}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        name: "seller_language",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    
                    
                   <Modal
									handleMultiInputs={props.handleMultiInputs}
									ingredientsText={fields.ingredientsText}
									ingredients={fields.ingredients}
									handleChange={props.handleChange}
									handleKeyPress={props.handleKeyPress}
									remove={props.remove}
								/>
                <span className="errorText" style={{ color:'red', textAlign:'center' }}>{errors.skillname}</span>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button  color="success" size="lg" onClick={onSubmit}>
                      Register
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
       
      </div>
    </div>
  );
}
