import React from 'react';
import {Link} from 'react-router-dom';
import {Row,Col,Container,Form,Button} from 'react-bootstrap';
import FontAwesome from './common/FontAwesome';

import AuthService from "../services/auth.service";

const required = value => {
	if (!value) {
	  return (
		<div className="alert alert-danger" role="alert">
		  This field is required!
		</div>
	  );
	}
  };

  
class Login extends React.Component {
	constructor(props) {
		super(props);
		this.handleLogin = this.handleLogin.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
	
		this.state = {
		  email: "",
		  password: "",
		  loading: false,
		  message: ""
		};
	  }

	  componentDidMount() { 
		// Custom
		const user = AuthService.getCurrentUser();
		if (user) {
			window.location = '/myaccount/profile';
		  }
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
	
	  handleLogin(e) {
		e.preventDefault();
	
		this.setState({
		  message: "",
		  loading: true
		});
	
		// this.form.validateAll();
	
	
		  AuthService.login(this.state.email, this.state.password).then(
			() => {
			  this.props.history.push("/");
			  window.location.reload();
			},
			error => {
			  const resMessage =
				(error.response &&
				  error.response.data &&
				  error.response.data.message) ||
				error.message ||
				error.toString();
	
			  this.setState({
				loading: false,
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
	                        <Col md={9} lg={8} className="mx-auto pl-5 pr-5">
	                           <h3 className="login-heading mb-4">Welcome back!</h3>
	                           <Form
								onSubmit={this.handleLogin}
								ref={c => {
								this.form = c;
								}}
							>
	                              <div className="form-label-group">
	                                 <Form.Control type="email" id="inputEmail" name="email" onChange={this.onChangeEmail}  value={this.state.email} validations={[required]} placeholder="Email address" />
	                                 <Form.Label htmlFor="inputEmail" >Email</Form.Label>
	                              </div>
	                              <div className="form-label-group">
	                                 <Form.Control type="password" id="inputPassword"  name="password" onChange={this.onChangePassword} value={this.state.password} validations={[required]} placeholder="Password" />
	                                 <Form.Label htmlFor="inputPassword">Password</Form.Label>
	                              </div>

									{this.state.message && (
									<div className="form-group">
										<div className="alert alert-danger" role="alert">
										{this.state.message}
										</div>
									</div>
									)}


	                              <Form.Check  
	                              	className='mb-3'
							        custom
							        type="checkbox"
							        id="custom-checkbox"
							        label="Remember password"
							      />
								  <div className="form-group">
									<button
										className="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
										disabled={this.state.loading}
									>
										{this.state.loading && (
										<span className="spinner-border spinner-border-sm"></span>
										)}
										<span>Login</span>
									</button>
									</div>
	            
	                              <div className="text-center pt-3">
	                                 Don’t have an account? <Link className="font-weight-bold" to="/register">Sign Up</Link>
	                              </div>
		                           <hr className="my-4" />
		                           <p className="text-center">LOGIN WITH</p>
		                           <div className="row">
		                              <div className="col pr-2">
		                                 <Button className="btn pl-1 pr-1 btn-lg btn-google font-weight-normal text-white btn-block text-uppercase" type="submit"><FontAwesome icon="google" className="mr-2" /> Google</Button>
		                              </div>
		                              <div className="col pl-2" style={{textAlign: 'right'}}>
		                                 <Button className="btn pl-1 pr-1 btn-lg btn-facebook font-weight-normal text-white btn-block text-uppercase" type="submit"><FontAwesome icon="facebook" className="mr-2" /> Facebook</Button>
		                              </div>
		                           </div>
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


export default Login;