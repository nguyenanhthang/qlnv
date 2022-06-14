import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup, Form } from 'reactstrap';

const UpdateJob = (props) => {
    const { setModalUpdate, modalUpdate, handleChangeJobName,
        handleChangeEndTime, handleChangeNote, jobName, endTime,
        note, handleUpdateJob } = props

    const toggle = () => setModalUpdate(!modalUpdate);
    useEffect(() => {
    }, [])
    return (
        <div>

            <Modal isOpen={modalUpdate} toggle={toggle}>
                <ModalHeader toggle={toggle}>Chỉnh sửa công việc</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="jobName">
                                Tên công việc
                            </Label>
                            <Input
                                id="jobName"
                                name="name"
                                value={jobName}
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
                                value={endTime.split('/').join('-')}
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
                                value={note}
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
                            handleUpdateJob()
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

export default UpdateJob;