import React from "react";
import { withRouter } from "react-router-dom";
import { Row, Col, Nav, NavItem, NavLink, Dropdown, DropdownToggle } from "reactstrap";
import { GetNameUser } from "../../../Constances/const";
import AuthService from '../../Services/AuthService';
import "./AppHeader.scss"
class AppHeader extends React.Component {
  state = {
    dropdownUserOpen: false,
    dropdownMasterDataOpen: false,
    dropdownInventoryOpen: false,
    modalUpdateInfo : false
  };
  setModalUpdateInfo = (modalUpdateInfo) =>{
    this.setState({modalUpdateInfo:modalUpdateInfo})
  }
  goTo(url = "") {
    url = window.location.origin + "/" + url;
    window.location.replace(url);
  }
  toggleUser = () => {
    this.setState({
      dropdownUserOpen: !this.state.dropdownUserOpen,
    });
  };

  toggleMasterData = () => {
    this.setState({
      dropdownMasterDataOpen: !this.state.dropdownMasterDataOpen,
    });
  };

  toggleWareHouse = () => {
    this.setState({
      dropdownInventoryOpen: !this.state.dropdownInventoryOpen,
    });
  };
  handleOpenInfo = () =>{
    this.setModalUpdateInfo(!this.state.modalUpdateInfo)
    console.log(123);
  }
  logout() {
    AuthService.userInfo = null;
    window.sessionStorage.clear();
    window.location.replace("login");
  }
  render() {
    return (
      <div>
        <>
          <Nav pills>
            <Row className="appHeaderContainer align-center">
              <Col sm="1">
                <a className="navbar-brand" href="!#"><i className="fa fa-cube fontsz-50"></i>WC<b>System</b></a>
              </Col>
              {AuthService && AuthService.userInfo.user.role === 'admin' &&
                <>
                  <Col sm="2">
                    <NavItem className="forEach">
                      <NavLink onClick={() => this.goTo('app/users')}>
                        <i className="fa  fontsz-30" /> QL nhân viên
                      </NavLink>
                    </NavItem>
                  </Col>
                  <Col sm="2">
                    <NavItem className="forEach">
                      <NavLink onClick={() => this.goTo('app/job')}>
                        <i className="fa  fontsz-30"></i>Ql Công việc
                      </NavLink>
                    </NavItem>
                  </Col>
                  <Col sm="2">
                    <NavItem className="forEach">
                      <NavLink onClick={() => this.goTo('app/working')}>
                        <i className="fa  fontsz-30" /> Công việc
                      </NavLink>
                    </NavItem>
                  </Col>
                </>
              }
              {AuthService && AuthService.userInfo.user.role === 'staff' &&
                <>
                  <Col sm="2">
                    <NavItem className="forEach">
                      <NavLink onClick={() => this.goTo('app/working')}>
                        <i className="fa  fontsz-30" /> Công việc
                      </NavLink>
                    </NavItem>
                  </Col>
                </>
              }
              <Col sm="2">
                <NavItem className="forEach">
                  <NavLink onClick={() => this.goTo('app/file')}>
                    <i className="fa  fontsz-30" /> File
                  </NavLink>
                </NavItem>
              </Col>
              <Col sm="2" className="end pointer"
              onClick={() => this.goTo('app/users/setpassword/' + JSON.parse(window.sessionStorage.getItem('user')).user.id)}
              >
                <b className="fontsz-28">{JSON.parse(window.sessionStorage.getItem('user')).user.full_name}</b>
              </Col>
              <Col sm="1" className="end" >
                <Dropdown nav isOpen={this.state.dropdownUserOpen} toggle={this.toggleUser}>
                  <DropdownToggle onClick={() => this.logout()}>
                    <i className="fa fa-sign-out fontsz-30" aria-hidden="true"></i>
                    <i className="fontsz-12">Log out</i>
                  </DropdownToggle>
                </Dropdown>
              </Col>
            </Row>
          </Nav>
        </>
      </div>
    );
  }
}


export default withRouter(AppHeader);