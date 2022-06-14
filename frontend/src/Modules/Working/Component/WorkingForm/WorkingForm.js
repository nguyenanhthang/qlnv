import { TabContent, TabPane, Nav, NavItem, NavLink, Table, Input, Button, Row, Col, Label, Modal } from "reactstrap";
import Select from "react-select";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { convertCtime, ORDER_STATUS, USER_STATUS } from "../../../../Constances/const";
import JobService from "../../../Job/Shared/JobService";
import ModalNoti from "../../../../Shared/Components/ModalNoti/ModalNoti";
import { TableLoading } from "../../../../Shared/Components/Loading/Loading.js"
import UserService from "../../../User/Shared/UserService"
const WorkingForm = () => {
    const headers = ["STT", "Tên công việc", 'trạng thái', 'Thời gian bắt đầu công việc', 'Thời gian kết thúc công việc', 'thao tác'];
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
    const [messageNoti, setMessageNoti] = useState('')
    const [listJobInit, setListJobInit] = useState()
    const [listModuleByJob, setListModuleByJob] = useState()
    const [listUser, setListUser] = useState()
    const [check, setCheck] = useState(false)
    const [jobByUser, setJobByUser] = useState()
    const user = JSON.parse(window.sessionStorage.getItem('user')).user
    useEffect(() => {
        UserService.getListUser().then(res => {
            setListUser(res.data)
        })
        JobService.getJobByUser(user.id).then(job => {
            setJobByUser(job.data.jobs)
        })
        JobService.getListJob().then(res => {
            setListJob(res.data)
            setListJobInit(res.data)
        }).catch(err => {
            console.log(err)
        })

    }, [addJob, updateJob, check]);
    const done = () => {
        setMessageNoti("")
    }
    const handleTakeJob = async (e) => {
        let payload = {
            job_id: e,
            user_id: user.id
        }
        await JobService.addUser(payload)
        setCheck(!check)
        setMessageNoti("Nhận thành công")
    }

    const onSelectJobOption = (e) => {
        let jobStatus = e.value
        let listJobFilter = listJobInit.filter(el => el.status === jobStatus)
        setListJob(listJobFilter)
    }
    return (
        <div className="min-h-90 df-h-60 form-export">
            <ModalNoti message={messageNoti} done={done} />
            <h1 className="upper middle">Danh sách công việc</h1>
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
                        <Link to={`/app/working/job/user/${user.id}`}>
                            <Button>Công việc của tôi</Button>
                        </Link>
                    </Col>
                </Row>
                {user && (
                    <div className="table-responsive mt-20 ">
                        <Table hover striped bordered className="table-head-fixed">
                            <thead className="thead_order upper">
                                <tr className="middle">
                                    {headers.map(e => (
                                        <th>{e}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bodyTable"

                            >
                                {(listJob && listUser && jobByUser) ? listJob.map((el, index) => (
                                    <tr
                                        key={el.id}
                                    >
                                        <td>{index + 1}</td>
                                        <td >
                                            <Link to={`/app/job/user/${el.id}`}>
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
                                        <td>
                                            {(jobByUser.some(ex => ex.id === el.id)) ?
                                                (
                                                    <Button
                                                        disabled
                                                        className="btn-sm"> Đã nhận</Button>
                                                )
                                                :
                                                (
                                                    <Button
                                                        onClick={(e) => handleTakeJob(el.id)}
                                                        className="btn-sm">Nhận job</Button>
                                                )
                                            }

                                        </td>

                                    </tr>
                                )) : <TableLoading length={headers.length} />}
                            </tbody>
                        </Table>
                    </div>
                )}
            </div>
        </div>
    );
};
export default WorkingForm;
