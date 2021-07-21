import React from 'react';
import {Link} from 'react-router-dom';
import {Row,Col,Container,Form,Button} from 'react-bootstrap';
import AuthService from "../services/auth.service";
import { isEmail } from "validator";
import Icofont from 'react-icofont';
import FontAwesome from './common/FontAwesome';

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

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.handleRegister = this.handleRegister.bind(this);
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeLName = this.onChangeLName.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.onChangeRePassword = this.onChangeRePassword.bind(this);
	
		this.state = {
		  name: "",
		  lname: "",
		  email: "",
		  password: "",
		  password_confirmation: "",
		  successful: false,
		  message: "",
		  type: "0",
		  buttoncustomer: "btn-primary",
		  buttonseller: "btn-outline-primary"
		};
	  }

	  componentDidMount() { 
		// Custom
		const user = AuthService.getCurrentUser();
		if (user) {
			window.location = '/myaccount/profile';
		  }
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
	
	  onChangeEmail(e) {
		this.setState({
		  email: e.target.value
		});
	  }
	
	  onChangePassword(e) {
		this.setState({
		  password: e.target.value
		});
	  }

	  onChangeRePassword(e) {
		this.setState({
			password_confirmation: e.target.value
		});
	  }

	  onCustomer(e){
		  this.setState({
			buttoncustomer: "btn-primary",
			buttonseller: "btn-outline-primary",
			type: "0"
		  })
	  }

	  onSeller(e){
		this.setState({
			buttoncustomer: "btn-outline-primary",
			buttonseller: "btn-primary",
			type: "1"
		  })
	  }
	
	  handleRegister(e) {
		e.preventDefault();
	
		this.setState({
		  message: "",
		  successful: false
		});
	
	

		  AuthService.register(
			this.state.name,
			this.state.lname,
			this.state.email,
			this.state.password,
			this.state.password_confirmation,
			this.state.type
		  ).then(
			response => {
			  this.setState({
				message: response.data.message,
				successful: true
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
				message: resMessage
			  });
			}
		  );
	  }

	render() {
    	return (
    	  <Container fluid className='bg-white'>
	         <Row>
	            <Col md={4} lg={6} className="d-none d-md-flex bg-image"></Col>
	            <Col md={8} lg={6}>
	               <div className="login d-flex align-items-center py-5">
	                  <Container>
	                     <Row>
	                        <Col md={9} lg={10} className="mx-auto pl-2 pr-2">
	                           <Form onSubmit={this.handleRegister}
									ref={c => {this.form = c;
									}}
									>
										{!this.state.successful && (
											<div>
												<h3 className="login-heading mb-4">Sign Up</h3>
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
	                              <div className="form-label-group">
	                                 <Form.Control type="email" id="inputEmail" name="email" value={this.state.email} onChange={this.onChangeEmail} placeholder="Email address" validations={[required, email]} />
	                                 <Form.Label htmlFor="inputEmail">Email</Form.Label>
	                              </div>
	                              <div className="form-label-group">
	                                 <Form.Control type="password" id="inputPassword" name="password" value={this.state.password} onChange={this.onChangePassword} placeholder="Password" validations={[required, vpassword]} />
	                                 <Form.Label htmlFor="inputPassword">Password</Form.Label>
	                              </div>
	                              <div className="form-label-group">
	                                 <Form.Control type="password" id="inputRePassword" name="password_confirmation" placeholder="Retype Password" value={this.state.password_confirmation} onChange={this.onChangeRePassword} validations={[required]} />
	                                 <Form.Label htmlFor="inputRePassword">Re-enter password</Form.Label>
	                              </div>
								  <div className="float-right mb-4" style={{textAlign: 'right'}}>
								  <Link className={"btn "+ this.state.buttoncustomer} to="#" style={{paddingLeft: '.75rem'}} onClick={this.onCustomer.bind(this)} ><Icofont icon="cart-alt" /> Customer</Link>
									<Link className={"btn "+ this.state.buttonseller} to="#" onClick={this.onSeller.bind(this)} ><Icofont icon="layered-cake" /> Seller</Link>
									</div>
	                              <Link to="#" className="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2" onClick={this.handleRegister.bind(this)}>Sign Up</Link>
	                              <div className="text-center pt-3">
	                                 Already have an account? <Link className="font-weight-bold" to="/login">Sign In</Link>
	                              </div>
								  <hr className="my-2" />
		                           <p className="text-center">Sign Up WITH</p>
		                           <div className="row">
		                              <div className="col pr-2">
		                                 <Button className="btn pl-1 pr-1 btn-lg btn-google font-weight-normal text-white btn-block text-uppercase" type="submit"><FontAwesome icon="google" className="mr-2" /> Google</Button>
		                              </div>
		                              <div className="col pl-2" style={{textAlign: 'right'}}>
		                                 <Button className="btn pl-1 pr-1 btn-lg btn-facebook font-weight-normal text-white btn-block text-uppercase" type="submit"><FontAwesome icon="facebook" className="mr-2" /> Facebook</Button>
		                              </div>
		                           </div>
								  </div>
								   )}
								  {this.state.message && (
									<div className="form-group">
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
	                  </Container>
	               </div>
	            </Col>
	         </Row>
	      </Container>
    	);
    }
}


export default Register;