import { TabContent, TabPane, Nav, NavItem, NavLink, Table, Input, Button, Row, Col, Label, Modal } from "reactstrap";
import Select from "react-select";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { convertCtime, ORDER_STATUS, USER_STATUS } from "../../../../Constances/const";
import JobService from "../../../Job/Shared/JobService";
import ModalNoti from "../../../../Shared/Components/ModalNoti/ModalNoti";
import { TableLoading } from "../../../../Shared/Components/Loading/Loading.js"
import CreateJob from "../Modal/CreateJob";
import UpdateJob from "../Modal/UpdateJob"
import UpdateModule from "../Modal/UpdateModule";
import UserService from "../../../User/Shared/UserService"
const JobForm = (props) => {
    const headers = ["STT", "Tên công việc", 'trạng thái', 'Thời gian bắt đầu công việc', 'Thời gian kết thúc công việc'];
    const [listJob, setListJob] = useState()
    const [addJob, setAddJob] = useState(false)
    const JOB_STATUS = [
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

    const [status, setStatus] = useState(JOB_STATUS[0])
    const [updateJob, setUpdateJob] = useState(false)
    const [jobName, setJobName] = useState('')
    const [moduleName, setModuleName] = useState()
    const [endTimeModule, setEndTimeModule] = useState()
    const [endTime, setEndTime] = useState('')
    const [note, setNote] = useState('')
    const [idUpdate, setIdUpdate] = useState()
    const [messageNoti, setMessageNoti] = useState('')
    const [modalCreate, setModalCreate] = useState(false)
    const [modalUpdate, setModalUpdate] = useState(false)
    const [moduleUpdate, setModuleUpdate] = useState(false)
    const [listJobInit, setListJobInit] = useState()
    const [listModuleByJob, setListModuleByJob] = useState()
    const [listModule, setListModule] = useState()
    const [user, setUser] = useState()
    const [listUser, setListUser] = useState()
    useEffect(() => {
        UserService.getListUser().then(res => {
            setListUser(res.data)
        })
        JobService.getListJob().then(res => {
            setListJob(res.data)
            setListJobInit(res.data)
        }).catch(err => {
            console.log(err)
        })

    }, [addJob, updateJob]);
    const done = () => {
        setMessageNoti("")
    }
    const handleModalCreate = () => {
        setModalCreate(true)
    }
    const handleChangeJobName = (e) => {
        setJobName(e.target.value)
    }
    const handleChangeModuleName = (e) => {
        setModuleName(e.target.value)
    }
    const handleChangeEndTimeModule = (e) => {
        setEndTimeModule(e.target.value)
    }
    const handleChangeEndTimeJob = (e) => {
        setEndTime(e.target.value)
    }
    const handleChangeNote = (e) => {
        setNote(e.target.value)
    }
    const handleCreateJob = async () => {
        let payload = {
            name: jobName,
            deadline: endTime?.split('-').join('/'),
            note: note
        }
        await JobService.createJob(payload)
        setAddJob(true)
        setMessageNoti("Thêm thành công")
    }
    const handleCreateModule = () => {
        let payload = {
            name: moduleName,
            deadline: endTimeModule?.split('-').join('/'),
            job_id: idUpdate
        }
        JobService.createModule(payload).then(res => {
            handleModuleUpdate(idUpdate)
        })
    }
    const handleUpdateJob = async () => {
        let payload = {
            name: jobName,
            deadline: endTime?.split('-').join('/'),
            note: note
        }
        await JobService.updateJob(idUpdate, payload)
        setUpdateJob(true)
        setMessageNoti("Sửa thành công")
    }
    const handleModuleUpdate = (e) => {
        JobService.getListModuleByJob(e).then(res => {
            setIdUpdate(e)
            setListModuleByJob(res.data)
        })
        setModuleUpdate(true)
    }
    const handleModalUpdate = (e) => {
        JobService.getJob(e).then(res => {
            setJobName(res.data.name)
            setEndTime(res.data.deadline)
            setNote(res.data.full_name)
            setIdUpdate(e)
            setModalUpdate(true)
        })
    }
    const onSelectJobOption = (e) => {
        let jobStatus = e.value
        let listJobFilter = listJobInit.filter(el => el.status === jobStatus)
        setListJob(listJobFilter)
    }

    return (
        <div className="min-h-90 df-h-60 form-export">
            <CreateJob
                setMessageNoti={setMessageNoti}
                modalCreate={modalCreate}
                setModalCreate={setModalCreate}
                handleChangeJobName={handleChangeJobName}
                handleChangeEndTimeJob={handleChangeEndTimeJob}
                handleChangeNote={handleChangeNote}
                handleCreateJob={handleCreateJob}
            />
            <UpdateJob
                jobName={jobName}
                endTime={endTime}
                note={note}
                modalUpdate={modalUpdate}
                setModalUpdate={setModalUpdate}
                setMessageNoti={setMessageNoti}
                handleChangeJobName={handleChangeJobName}
                handleChangeEndTimeJob={handleChangeEndTimeJob}
                handleChangeNote={handleChangeNote}
                handleUpdateJob={handleUpdateJob}
            />
            <ModalNoti message={messageNoti} done={done} />
            <h1 className="upper middle">Quản lý Công việc</h1>
            <div className="tableOrder mt-20">
                <Row>
                    <Col className="p-0" sm={3}>
                        <Input
                            placeholder="Tìm kiếm theo tên đầu việc..." />
                    </Col>
                    <Col sm={2}>
                        <Select
                            options={JOB_STATUS}
                            defaultValue={status}
                            onChange={(e) => onSelectJobOption(e)}
                        >
                        </Select>
                    </Col>
                    <Col sm={5}>
                    </Col>

                    <Col sm={2}>
                        <Button
                            onClick={() => { handleModalCreate() }}
                        >
                            Thêm công việc
                        </Button>
                    </Col>
                </Row>
                <div className="table-responsive mt-20 ">
                    <Table hover striped bordered className="table-head-fixed">
                        <thead className="thead_order upper">
                            <tr className="middle">
                                <th>STT</th>
                                <th>Tên công việc</th>
                                <th>Trạng thái </th>
                                <th>Thời gian bắt đầu</th>
                                <th>Thời gian kết thúc</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bodyTable"

                        >
                            {(listJob && listUser) ? listJob.map((el, index) => (
                                <tr
                                    key={el.id}
                                >
                                    <td>{index + 1}</td>
                                    <td >
                                        <Link to={`/app/job/user/job/${el.id}`}>
                                            {el.name}
                                        </Link>
                                    </td>
                                    <td

                                    >
                                        {el.status}
                                    </td>
                                    <td
                                    >
                                        {convertCtime(el.ctime, "simple")}
                                    </td>
                                    <td
                                    >
                                        {el.deadline?.split('/').reverse().join('/')}
                                    </td>
                                    <td >
                                        <Link to={`/app/job/${el.id}`}>
                                            <Button className="btn-sm">Quản lý job</Button> {" "}
                                        </Link>
                                        <Button
                                            onClick={(e) => handleModalUpdate(el.id)}
                                            className="btn-sm">sửa job</Button> {" "}
                                    </td>
                                </tr>
                            )) : <TableLoading length={headers.length} />}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};
export default JobForm;
