import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup, Form } from 'reactstrap';
import UserService from '../../Shared/UserService'

const CreateUser = (props) => {
    const { modalCreate, setModalCreate, handleChangeUserName,
        handleChangeUserFullName, handleChangeUserPhone, handleChangeUserRole,
        handleCreateUser } = props

    const toggle = () => setModalCreate(!modalCreate);
    useEffect(() => {
    }, [])
    return (
        <div>
            <Modal isOpen={modalCreate} toggle={toggle}>
                <ModalHeader toggle={toggle}>Thêm mới nhân viên</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="userName">
                                Tên nhân viên
                            </Label>
                            <Input
                                id="userName"
                                name="name"
                                placeholder="Nhập tên nhân viên"
                                type="text"
                                onChange={(e) => { handleChangeUserName(e) }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="userLogin">
                                Tên đăng nhập
                            </Label>
                            <Input
                                id="userLogin"
                                name="name"
                                placeholder="Nhập tên đăng nhập nhân viên"
                                type="text"
                                onChange={(e) => { handleChangeUserFullName(e) }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="userPhone">
                                Số điện thoại
                            </Label>
                            <Input
                                id="userPhone"
                                name="phone"
                                placeholder="Nhập số điện thoại"
                                type="text"
                                onChange={(e) => { handleChangeUserPhone(e) }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="userRole">
                                Chức vụ
                            </Label>
                            <Input
                                id="userRole"
                                name="role"
                                type="select"
                                onChange={(e) => { handleChangeUserRole(e) }}
                            >
                                <option>
                                    hr
                                </option>
                                <option>
                                    manager
                                </option>
                                <option>
                                    staff
                                </option>
                                <option>
                                    admin
                                </option>
                            </Input>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={() => {
                            handleCreateUser()
                            toggle()
                        }}
                    >
                        Submit
                    </Button>
                    <Button color="secondary" onClick={toggle}>Thoát</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default CreateUser;