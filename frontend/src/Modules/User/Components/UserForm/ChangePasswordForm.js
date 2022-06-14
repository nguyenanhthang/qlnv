import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import ModalConfirm from '../../../../Shared/Components/ModalConfirm/ModalConfirm';
import ModalNoti from '../../../../Shared/Components/ModalNoti/ModalNoti';
import UserService from '../../../User/Shared/UserService';
import { ERR_MSG } from '../../../../Constances/const';

export default class ChangePasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      full_name : " ",
      confirmPassword: '',
      newPassword: '',
      confirmMessage: '',
      err: '',
    }
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    ////////// get user ////////////
    if (id) {
      UserService.getInfo()
      .then(response => {
          const data = response.data;
          this.setState({
            full_name: data.user.full_name,
            username: data.user.username,
          });
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  }

  onChangeNewPw = (e) => {
    let newPassword = e.target.value;
    if(newPassword.length < 6){
        this.setState({
            err: ERR_MSG.MIN_LENGTH + ' 5',
            newPassword
        });   
    }else{
        this.setState({
            newPassword,
            err: ''
        });
    }  
  }
  onChangeCfPw = (e) => {
      this.setState({confirmPassword: e.target.value})
  }
  ////////////////// set confirm message //////////////
  onSubmit = () => {
    const {newPassword, confirmPassword, err} = this.state;
    if(err === ''){
        if(newPassword !== confirmPassword){
            this.setState({
                err: ERR_MSG.CF_PASSWORD,
            })
        }else{
            this.setState({
                confirmMessage: 'Bạn muốn cập nhập lại mật khẩu?'
            });
        }
    }
  }


  answer = (answer) => {
    const id = this.props.match.params.id;
    if (answer) {
        const data = {
            id,
            password: this.state.newPassword
        }
        UserService.postUpdatePassword(data)
        .then(res => {
            this.setState({notiMessage: 'Cập nhật thành công!'});
        }).catch(err => {
            this.setState({notiMessage: 'Cập nhật mật khẩu thất bại!'});
            console.log(err);
        });
    }
    else {
      this.setState({
        confirmMessage: ''
      })
    }
  }

  doneAlert = () => {
    if (this.state.notiMessage) {
      window.history.back();
    } else {
      this.setState({ notiMessage: '' })
    }
  }
  onCancel = () => {
    window.history.back();
  }
  render() {
    let { full_name, username, confirmPassword, newPassword, err } = this.state;
    return (
      <div className="addUpdate ">
          <h4 className="text-center title-card-lg">
            Cập nhập mật khẩu
          </h4>
          <Form
            style={{ width: "500px", margin: "40px auto" }}
          >
            <Row form>
              <Col>
                <FormGroup sm={6}>
                  <Label for="full_name">Họ Tên</Label>
                  <Input
                    readOnly
                    type="text"
                    className="full_name"
                    name="full_name"
                    value={full_name}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="username">Tên tài khoản</Label>
              <Input
                readOnly
                type="text"
                className="username"
                name="username"
                value={username}
              />
            </FormGroup>
            <FormGroup>
              <Label for="newPassword">Mật khẩu mới</Label>
              <Input
                type="password"
                className="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={this.onChangeNewPw}
              />
              {err !== '' ? <span style={{ 'color': 'red' }}>{err}</span> : null}
            </FormGroup>
            <FormGroup>
              <Label for="confirmPassword">Xác nhận lại  mật khẩu mới</Label>
              <Input
                type="password"
                className="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={this.onChangeCfPw}
              />
            </FormGroup>
            <div className="addControl">
              <Button
                outline
                color="primary"
                onClick={this.onSubmit}
              >
                Cập nhập
              </Button>{" "}
              <Button
                  color="danger"
                  onClick={this.onCancel}
              >
                  Hủy
              </Button>
            </div>
          </Form>
          <ModalConfirm
            message={this.state.confirmMessage}
            answer={this.answer}
          ></ModalConfirm>
          <ModalNoti
            message={this.state.notiMessage}
            done={this.doneAlert}
          ></ModalNoti>
      </div>
    );
  }
}

