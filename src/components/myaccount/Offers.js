import React from 'react';
import {Row,Col,Form,Button,Alert} from 'react-bootstrap';
import { isEmail } from "validator";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";


const required = value => {
	if (!value) {
	  return (
		<div className="alert alert-danger" role="alert">
		  This field is required!
		</div>
	  );
	}
  };

const email = value => {
	if (!isEmail(value)) {
	  return (
		<div className="alert alert-danger" role="alert">
		  This is not a valid email.
		</div>
	  );
	}
  };


  const vpassword = value => {
	if (value.length < 6 || value.length > 40) {
	  return (
		<div className="alert alert-danger" role="alert">
		  The password must be between 6 and 40 characters.
		</div>
	  );
	}
  };

class Offers extends React.Component {
	constructor(props) {
		super(props);
		this.handleRegister = this.handleRegister.bind(this);
		this.handleMerchant = this.handleMerchant.bind(this);
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeLName = this.onChangeLName.bind(this);
		this.onChangeApt = this.onChangeApt.bind(this);
		this.onChangeStreet = this.onChangeStreet.bind(this);
		this.onChangeCity = this.onChangeCity.bind(this);
		this.onChangeState = this.onChangeState.bind(this);
		this.onChangeZip = this.onChangeZip.bind(this);
	
		this.state = {
		  currentUser: AuthService.getCurrentUser(),
		  userPayment: null,
		  name: AuthService.getCurrentUser().user.name,
		  lname: AuthService.getCurrentUser().user.lname,
		  street: AuthService.getCurrentUser().user.info.street,
		  apt: AuthService.getCurrentUser().user.info.apt,
		  city: AuthService.getCurrentUser().user.info.city,
		  state: AuthService.getCurrentUser().user.info.state,
		  zip: AuthService.getCurrentUser().user.info.zip,
		  successful: false,
		  message: "",
		  messageM: "",
		  loading: false,
		  loadingM: false,
		  paymentCheck: false
		};
	  }


	  componentDidMount() { 
		// Custom
		const user = AuthService.getCurrentUser();
		this.getUserPay().then(result => this.setState({
			userPayment: result.data
		}
		))
		// const userPaymentCheck  = 
		// if(userPaymentCheck.status === null){
		// 	this.setState({
		// 		paymentCheck: false
		// 	  });
		// }else{
		// 	this.setState({
		// 		paymentCheck: userPaymentCheck
		// 	  });
		// }
	}

	getUserPay(){
		return UserService.getUserPayment();
	}

	onChangeName(e) {
		this.setState({
		  name: e.target.value
		});
	  }

	  onChangeLName(e) {
		this.setState({
		  lname: e.target.value
		});
	  }

	  onChangeStreet(e) {
		this.setState({
		  street: e.target.value
		});
	  }

	  onChangeApt(e) {
		this.setState({
		  apt: e.target.value
		});
	  }

	  onChangeCity(e) {
		this.setState({
		  city: e.target.value
		});
	  }

	  onChangeState(e) {
		this.setState({
		  state: e.target.value
		});
	  }

	  onChangeZip(e) {
		this.setState({
		  zip: e.target.value
		});
	  }

	  handleMerchant(e){
		e.preventDefault();

		this.setState({
			loadingM: true
		  });

		  UserService.postMerchant().then(
			  response => {
				this.setState({
					loadingM: false,
					messageM: "Payment has been created!",
					successful: true
				  });
				  console.log(response.data);
				window.location = response.data.url;
			  },
			  error => {
				const resMessage =
				  (error.response &&
					error.response.data &&
					error.response.data.message) ||
				  error.message ||
				  error.toString();
	  
				this.setState({
				  messageM: resMessage,
				  loadingM: false,
				  successful: false
				});
			  }
		  )
	  }

	  handleRegister(e) {
		e.preventDefault();
	
		this.setState({
		  message: "",
		  successful: false,
		  loading: true
		});
	
	

		UserService.update(
			this.state.name,
			this.state.lname,
			this.state.street,
			this.state.apt,
			this.state.city,
			this.state.state,
			Number(this.state.zip),
		  ).then(
			response => {
			  this.setState({
				message: "your profile has been successfully updated!",
				successful: true,
				loading: false
			  });
			},
			error => {
			  const resMessage =
				(error.response &&
				  error.response.data &&
				  error.response.data.message) ||
				error.message ||
				error.toString();
	
			  this.setState({
				successful: false,
				message: resMessage,
				loading: false
			  });
			}
		  );
	  }
	render() {
		const { userPayment } = this.state;
    	return (
    		<>
    		    <div className='p-4 bg-white shadow-sm'>
	              <Row>
	               <Col md={12}>
	                  <h4 className="font-weight-bold mt-0 mb-3">Profile</h4>
	               </Col>
	               

					<Col md={9} lg={10} className="mx-auto pl-2 pr-2">
	                           <Form onSubmit={this.handleRegister}
									ref={c => {this.form = c;
									}}
									>
									
											<div>
												<Row>
									<Col>
							   <div className="form-label-group mb-4">
	                                 <Form.Control type="text" id="inputName"  name="name" value={this.state.name} onChange={this.onChangeName} placeholder="First Name" validations={[required]} />
	                                 <Form.Label htmlFor="inputName">First Name</Form.Label>
	                              </div>
								  </Col>
								  <Col>
								  <div className="form-label-group mb-4">
	                                 <Form.Control type="text" id="inputLName" name="lname" value={this.state.lname} onChange={this.onChangeLName} placeholder="Last Name" validations={[required]} />
	                                 <Form.Label htmlFor="inputLName">Last Name</Form.Label>
	                              </div>
								  </Col>
								  </Row>

								  <Row>
									<Col md={8}>
							   <div className="form-label-group mb-4">
	                                 <Form.Control type="text" id="inputStreet"  name="street" value={this.state.street} onChange={this.onChangeStreet} placeholder="Street Address" validations={[required]} />
	                                 <Form.Label htmlFor="inputStreet">Street Address</Form.Label>
	                              </div>
								  </Col>
								  <Col md={4}>
								  <div className="form-label-group mb-4">
	                                 <Form.Control type="text" id="inputApt" name="apt" value={this.state.apt} onChange={this.onChangeApt} placeholder="Apt number" validations={[required]} />
	                                 <Form.Label htmlFor="inputApt">Apartment number or suite</Form.Label>
	                              </div>
								  </Col>
								  </Row>

								  <Row>
								  <Col md={6}>
								  <div className="form-label-group mb-4">
	                                 <Form.Control type="text" id="inputCity" name="city" value={this.state.city} onChange={this.onChangeCity} placeholder="City" validations={[required]} />
	                                 <Form.Label htmlFor="inputCity">City</Form.Label>
	                              </div>
								  </Col>
								  <Col md={2}>
								  <div className="form-label-group mb-4">
	                                 <Form.Control type="text" id="inputState" name="state" value={this.state.state} onChange={this.onChangeState} placeholder="State" validations={[required]} />
	                                 <Form.Label htmlFor="inputState">State</Form.Label>
	                              </div>
								  </Col>
								  <Col md={4}>
								  <div className="form-label-group mb-4">
	                                 <Form.Control type="number" id="inputZip" name="zip" value={this.state.zip} onChange={this.onChangeZip} placeholder="Zip code" validations={[required]} />
	                                 <Form.Label htmlFor="inputZip">Zip</Form.Label>
	                              </div>
								  </Col>
								  </Row>
	                        
		                           <div className="row">
									   <div className="col-8 pr-2"></div>
		                              <div className="col-4 pl-2 " style={{textAlign: 'right'}}>
		                                 <Button className="btn pl-1 pr-1 btn-lg btn-facebook font-weight-normal text-white btn-block text-uppercase" type="submit">
										 {this.state.loading && (
										<span className="spinner-border spinner-border-sm"></span>
										)}
											 Save</Button>
		                              </div>
		                           </div>
								  </div>
								   
								  {this.state.message && (
									<div className="form-group">
										<span>&nbsp;&nbsp;</span>
										<div
										className={
											this.state.successful
											? "alert alert-success"
											: "alert alert-danger"
										}
										role="alert"
										>
										{this.state.message}
										</div>
									</div>
									)}
	                           </Form>
	                        </Col>

	            </Row>
				</div>
				<span>&nbsp;&nbsp;</span>
				<span>&nbsp;&nbsp;</span>
				{!userPayment ? (
				<div className='p-4 bg-white pb-2 shadow-sm'>
				<Row>
	               <Col md={12}>
	                  <h4 className="font-weight-bold mt-0 mb-3">Payout info</h4>
	               </Col>
				   </Row>

				   <Row className="justify-content-md-center">
					   <Col></Col>
				   	<Col>
					   <Form onSubmit={this.handleMerchant}
									>
				   <div className="row">
								
		                              <div className="col-12 pl-2 " style={{textAlign: 'center'}}>
		                                 <Button className="btn pl-1 pr-1 btn-lg font-weight-normal btn-block" variant="info" type="submit">
										 {this.state.loadingM && (
										<span className="spinner-border spinner-border-sm"></span>
										)}
										 Setup Payouts</Button>
		                              </div>
		                           </div>
								   </Form>
					</Col>
					<Col></Col>
					</Row>
					{/* {this.state.messageM && (
									<div className="form-group">
										<span>&nbsp;&nbsp;</span>
										<div
										className={
											this.state.successful
											? "alert alert-success"
											: "alert alert-danger"
										}
										role="alert"
										>
										{this.state.messageM}
										</div>
									</div>
									)} */}
					<span>&nbsp;&nbsp;</span>
					<Alert variant="warning" dismissible role="alert">
					Set up your <strong>card and bank info</strong> to get paid.
		                  </Alert>
	            
			    </div>
				): (
					<div className='p-4 bg-white pb-2 shadow-sm'>
					<Row>
					   <Col md={12}>
						  <h4 className="font-weight-bold mt-0 mb-3">Payout info</h4>
					   </Col>
					   </Row>
	
						{/* {this.state.messageM && (
										<div className="form-group">
											<span>&nbsp;&nbsp;</span>
											<div
											className={
												this.state.successful
												? "alert alert-success"
												: "alert alert-danger"
											}
											role="alert"
											>
											{this.state.messageM}
											</div>
										</div>
										)} */}
						<span>&nbsp;&nbsp;</span>
						<Alert variant="success" dismissible role="alert">
						My Payment Account
							  </Alert>
					
					</div>	
				)}
		    </>
    	);
    }
}
export default Offers;