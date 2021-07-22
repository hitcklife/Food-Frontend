import React from 'react';
import {Switch,Route} from 'react-router-dom';
import {NavLink,Link } from 'react-router-dom';
import {Row,Col,Container,Image,Badge} from 'react-bootstrap';
import Offers from './myaccount/Offers';
import Orders from './myaccount/Orders';
import Favourites from './myaccount/Favourites';
import Payments from './myaccount/Payments';
import Addresses from './myaccount/Addresses';
import Info from './myaccount/Info';
import EditProfileModal from './modals/EditProfileModal';
import AuthService from "../services/auth.service";

class MyAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditProfile: false,
      currentUser: AuthService.getCurrentUser()
    };
  }
  hideEditProfile = () => this.setState({ showEditProfile: false });
  logOut() {
   AuthService.logout();
  }
	render() {
      const { currentUser } = this.state;
    	return (
    		<>
        <EditProfileModal show={this.state.showEditProfile} onHide={this.hideEditProfile}/>
        <section className="section pt-4 pb-4 osahan-account-page">
           <Container>
              <Row>
                 <Col md={3}>
                    <div className="osahan-account-page-left shadow-sm bg-white h-100">
                       <div className="border-bottom p-4">
                          <div className="osahan-user text-center">
                             <div className="osahan-user-media">
                                <Image className="mb-3 rounded-pill shadow-sm mt-1" src={"https://backend.hitcklife.com/storage/"+currentUser.user.info.avatar} alt={currentUser.user.name + " " + currentUser.user.lname} />
                                <div className="osahan-user-media-body">
                                   <h6 className="mb-2">{currentUser.user.name} {currentUser.user.lname}</h6>
                                   <p className="mb-1">+{currentUser.user.info.phone}</p>
                                   <p>{currentUser.user.email}</p>
                                   <p className="mb-0 text-black font-weight-bold"><Link to='#' onClick={() => this.setState({ showEditProfile: true })} className="text-primary mr-3"><i className="icofont-ui-edit"></i> EDIT</Link></p>
                                </div>
                             </div>
                          </div>
                       </div>
                       <ul className="nav flex-column border-0 pt-4 pl-4 pb-4">
                       <li className="nav-item">
                             <NavLink className="nav-link" activeClassName="active" exact to="/myaccount/profile"><i className="icofont-sale-discount"></i> Profile</NavLink>
                          </li>
                          {currentUser.user.type === 1 && (
                              <div>
                           <li className="nav-item">
                              <NavLink className="nav-link" activeClassName="active" exact to="/myaccount/company/info"><i className="icofont-bag-alt"></i> My Company</NavLink>
                           </li>
                           <li className="nav-item">
                           <NavLink className="nav-link" activeClassName="active" exact to="/myaccount/addresses"><i className="icofont-box"></i> Orders <Badge variant="danger" className='mr-1'>+1</Badge></NavLink>
                           </li>
                              </div>
                               )}
                          <li className="nav-item">
                             <NavLink className="nav-link" activeClassName="active" exact to="/myaccount/orders"><i className="icofont-food-cart"></i> Orders</NavLink>
                          </li>
                          <li className="nav-item">
                             <NavLink className="nav-link" activeClassName="active" exact to="/myaccount/favourites"><i className="icofont-facebook-messenger"></i> Messages</NavLink>
                          </li>
                          <li className="nav-item">
                             <NavLink className="nav-link" activeClassName="active" exact to="/myaccount/payments"><i className="icofont-credit-card"></i> Payments</NavLink>
                          </li>
                          <li className="nav-item">
                             <NavLink className="nav-link" activeClassName="active" exact to="/myaccount/addresses"><i className="icofont-location-pin"></i> Help</NavLink>
                          </li>
                          <li className="nav-item">
                             <NavLink className="nav-link" activeClassName="active" exact to="/login" onClick={this.logOut}><i className="icofont-sign-out"></i> Sign Out</NavLink>
                          </li>
                       </ul>
                    </div>
                 </Col>
                 <Col md={9}>
                  <Switch>
                    <Route path="/myaccount/orders" exact component={Orders} />
                    <Route path="/myaccount/profile" exact component={Offers} />
                    <Route path="/myaccount/favourites" exact component={Favourites} />
                    <Route path="/myaccount/payments" exact component={Payments} />
                    <Route path="/myaccount/addresses" exact component={Addresses} />
                    <Route path="/myaccount/company/info" exact component={Info} />
                  </Switch>
                 </Col>
              </Row>
           </Container>
        </section>
    		</>
    	);
    }
}


export default MyAccount;