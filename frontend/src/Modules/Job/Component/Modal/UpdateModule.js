import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup, Form, Row, Col, Table } from 'reactstrap';

const UpdateModule = (props) => {
    const { handleChangeDeadLine, handleChangeModuleName,moduleName,deadline,idUpdate ,modalUpdate,setModalUpdate,handleUpdateModule } = props
    const toggle = () => setModalUpdate(!modalUpdate);
    useEffect(() => {
       
    }, [])
    return (
        <div>
            <Modal isOpen={modalUpdate} toggle={toggle}>
                <ModalHeader toggle={toggle}>Chỉnh sửa module</ModalHeader>
                <ModalBody>
                    <Form>
                        <Row>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label for="jobName">
                                        Tên module
                                    </Label>
                                    <Input
                                        id="jobName"
                                        name="name"
                                        value={moduleName}
                                        placeholder="Nhập tên Công việc"
                                        type="text"
                                        onChange={(e) => { handleChangeModuleName(e) }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm={4}>
                                <FormGroup>
                                    <Label for="deadline">
                                        Thời gian kết thúc
                                    </Label>
                                    <Input
                                        id="deadline"
                                        name="deadline"
                                        value={deadline?.split('/').join('-')}
                                        placeholder="Nhập deadline công việc"
                                        type="date"
                                        onChange={(e) => { handleChangeDeadLine(e) }}
                                    />
                                </FormGroup>
                            </Col>
                            
                        </Row>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button 
                     onClick={() => {
                        handleUpdateModule()
                        toggle()
                    }}
                    color="secondary">Submit</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default UpdateModule;