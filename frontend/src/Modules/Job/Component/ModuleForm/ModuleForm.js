import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from "react-router-dom";
import Select from "react-select";
import UpdateModule from '../Modal/UpdateModule';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup, Form, Row, Col, Table, Alert } from 'reactstrap';
import JobService from '../../Shared/JobService'
import UserSevice from '../../../User/Shared/UserService'
const ModuleForm = (props) => {
    let { id } = useParams()
    const [listJob, setListJob] = useState()
    const [listUser, setListUser] = useState()
    const [listModule, setListModule] = useState()
    const [listModuleInit, setListModuleInit] = useState()
    const [moduleName, setModuleName] = useState()
    const [deadline, setDeadline] = useState()
    const [addModule, setAddModule] = useState(false)
    const [updateModule, setUpdateModule] = useState(false)
    const [idUpdate, setIdUpdate] = useState()
    const [modalUpdate, setModalUpdate] = useState(false)
    const [selectedUser,setSelectedUser] = useState()
    let USERS = listUser?.map((item) => ({
        value: item.id,
        label: item.full_name
    })) || []
    const MODULE_STATUS = [
        {
            label: "Mới",
            value: "new",
        },
        {
            label: "Đang làm",
            value: "running",
        },
        {
            label: "Tạm dừng",
            value: "pause",
        },
        {
            label: "Huỷ",
            value: "cancel",
        },
        {
            label: "Đã hoàn thành",
            value: "done",
        }
    ]
    useEffect(() => {
        UserSevice.getListUser().then(res => {
            setListUser(res.data)
        })
        JobService.getListJob().then(res => {
            setListJob(res.data)
        }).catch(err => {
            console.log(err);
        })
        JobService.getListModuleByJob(id).then(res => {
            setListModule(res.data)
            setListModuleInit(res.data)
        }).catch(err => {
            console.log(err);
        })
    }, [addModule, updateModule])
    const handleChangeModuleName = (e) => {
        setModuleName(e.target.value)
    }
    const handleChangeDeadLine = (e) => {
        setDeadline(e.target.value)
    }
    const handleCreateModule = () => {
        let payload = {
            name: moduleName,
            deadline: deadline?.split('-').join('/'),
            job_id: id
        }
        JobService.createModule(payload).then(res => {
            setAddModule(!addModule)
            alert('thêm thành công')
        }).catch(err => {
            console.log(err);
        })
    }
    const handleModalUpdate = (e) => {
        JobService.getModule(e).then(res => {
            setModuleName(res.data.name)
            setDeadline(res.data.deadline)
            setIdUpdate(e)
            setModalUpdate(true)
        })
    }
    const handleUpdateModule = async () => {
        let payload = {
            name: moduleName,
            deadline: deadline?.split('-').join('/'),
        }
        await JobService.updateModule(idUpdate, payload)
        setUpdateModule(!updateModule)
        alert("Sửa thành công")
    }
    const handleDeleteModule = async (e) => {
        await JobService.deleteModule(e)
        setUpdateModule(!updateModule)
        alert("Xóa thành công")
    }
    const onSelectModuleOption = (e) => {
        let moduleStatus = e.value
        let listModuleFilter = listModuleInit.filter(el => el.status === moduleStatus)
        setListModule(listModuleFilter)
    }
    return (
        <div>
            <UpdateModule
                handleUpdateModule={handleUpdateModule}
                modalUpdate={modalUpdate}
                setModalUpdate={setModalUpdate}
                moduleName={moduleName}
                deadline={deadline}
                idUpdate={idUpdate}
                handleChangeDeadLine={handleChangeDeadLine}
                handleChangeModuleName={handleChangeModuleName}
            />

            <Row>
                <Col sm={1}>
                    <Link to={`/app/job`}>
                        <Button>Quay lại</Button>
                    </Link>
                </Col>
                <Col>
                    <h1 className="upper middle">Thêm module cho dự án {listJob?.find(e => e.id === id)?.name}</h1></Col>
            </Row>
            <Form>
                <Row>
                    <Col sm={3}>
                        <FormGroup>
                            <Input
                                id="jobName"
                                name="name"
                                placeholder="Nhập tên Công việc"
                                type="text"
                                onChange={(e) => { handleChangeModuleName(e) }}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm={3}>
                        <FormGroup>

                            <Input
                                id="deadline"
                                name="deadline"
                                placeholder="Nhập deadline công việc"
                                type="date"
                                onChange={(e) => { handleChangeDeadLine(e) }}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm={2}>
                        <FormGroup>
                            <Button style={{ marginTop: '5px' }}
                                disabled={!moduleName}
                                onClick={() => {
                                    handleCreateModule()
                                }}
                            >Thêm Module</Button>

                        </FormGroup>
                    </Col>
                    <Col sm={2}>
                        <Select placeholder='filter by status'
                            options={MODULE_STATUS}
                            onChange={(e) => onSelectModuleOption(e)}
                        >
                        </Select>
                    </Col>
                    <Col sm={2}>
                        <Select placeholder='filter by user'
                            options={USERS}
                        >
                        </Select>
                    </Col>
                </Row>
                <div className="table-responsive mt-20 ">
                    <Table hover striped bordered className="table-head-fixed">
                        <thead className="thead_order upper">
                            <tr className="middle">
                                <th>STT</th>
                                <th>Tên module</th>
                                <th>Trạng thái </th>
                                <th>Thời gian bắt đầu</th>
                                <th>Thời gian kết thúc</th>
                                <th>Người thực hiện</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bodyTable"

                        >
                            {listModule ?
                                listModule.map((el, index) => (
                                    <tr
                                        key={el.id}

                                    >
                                        <td>{index + 1}</td>
                                        <td>
                                            {el.name}
                                        </td>
                                        <td>
                                            {el.status}
                                        </td>
                                        <td>
                                            {new Date(el.ctime).toLocaleDateString("en-GB")}
                                        </td>
                                        <td >
                                            {el.deadline.split('/').reverse().join('/')}
                                        </td>
                                        <td>
                                        
                                        </td>
                                        <td>
                                            <Button
                                                onClick={(e) => { handleModalUpdate(el.id) }}
                                                className='mr-10'>Sửa</Button>
                                            <Button onClick={(e) => { handleDeleteModule(el.id) }}
                                                color='danger'>Xoá</Button>
                                        </td>
                                    </tr>
                                )) : <></>}
                        </tbody>
                    </Table>
                </div>
            </Form>
            <div >
            </div>
        </div>
    );
}

export default ModuleForm;