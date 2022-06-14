import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup, Form } from 'reactstrap';

const CreateJob = (props) => {
    const { modalCreate, setModalCreate, handleChangeJobName,
        handleChangeEndTime, handleChangeNote,
        handleCreateJob } = props

    const toggle = () => setModalCreate(!modalCreate);
    useEffect(() => {
    }, [])
    return (
        <div>

            <Modal isOpen={modalCreate} toggle={toggle}>
                <ModalHeader toggle={toggle}>Thêm mới Công việc</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="jobName">
                                Tên công việc
                            </Label>
                            <Input
                                id="jobName"
                                name="name"
                                placeholder="Nhập tên Công việc"
                                type="text"
                                onChange={(e) => { handleChangeJobName(e) }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="deadline">
                                Thời gian kết thúc
                            </Label>
                            <Input
                                id="deadline"
                                name="deadline"
                                placeholder="Nhập deadline công việc"
                                type="date"
                                onChange={(e) => { handleChangeEndTime(e) }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="note">
                                Ghi chú
                            </Label>
                            <Input
                                id="note"
                                name="note"
                                placeholder="Ghi chú....."
                                type="textarea"
                                onChange={(e) => { handleChangeNote(e) }}
                            />
                        </FormGroup>

                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={() => {
                            handleCreateJob()
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

export default CreateJob;