import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup, Form } from 'reactstrap';

const UpdateUser = (props) => {
    const { modalUpdate, setModalUpdate, handleChangeUserName,
        handleChangeUserFullName, handleChangeUserPhone, handleChangeUserRole,
        handleUpdateUser, userName, userFullName, userPhone, userRole } = props

    const toggle = () => setModalUpdate(!modalUpdate);
    useEffect(() => {
    }, [])
    return (
        <div>
            <Modal isOpen={modalUpdate} toggle={toggle}>
                <ModalHeader toggle={toggle}>Chỉnh sửa nhân viên</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="userName">
                                Tên nhân viên
                            </Label>
                            <Input
                                id="userName"
                                name="name"
                                value={userFullName}
                                placeholder="Nhập tên nhân viên"
                                type="text"
                                onChange={(e) => { handleChangeUserFullName(e) }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="userLogin">
                                Tên đăng nhập
                            </Label>
                            <Input
                                id="userLogin"
                                name="name"
                                value={userName}
                                placeholder="Nhập tên đăng nhập nhân viên"
                                type="text"
                                onChange={(e) => { handleChangeUserName(e) }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="userPhone">
                                Số điện thoại
                            </Label>
                            <Input
                                id="userPhone"
                                name="phone"
                                value={userPhone}
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
                                value={userRole}
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
                            </Input>
                        </FormGroup>

                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={() => {
                            handleUpdateUser()
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

export default UpdateUser;