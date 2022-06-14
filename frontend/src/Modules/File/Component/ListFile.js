import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Row, Col, Label, Modal, FormGroup, FormText } from "reactstrap";
import FileService from "../Shared/FileService";
import { convertCtime } from "../../../Constances/const";
import { BASE_URL } from "../../../Constances/const";
import ModalNoti from '../../../Shared/Components/ModalNoti/ModalNoti';
import Axios from "axios";

const ListFile = (props) => {
    const [data, setData] = useState([])
    const [file, setFile] = useState()
    const [job, setJob] = useState()
    const [module, setModule] = useState()
    const [listJob, setListJob] = useState([])
    const [listModule, setListModule] = useState([])
    const [message, setMessage] = useState("")


    useEffect(() => {
        let filter = {}
        if(InfoUser().user.role !== 'admin') filter.user_id = InfoUser().user.id
        console.log(filter);
        FileService.getListFile(filter)
            .then(res => {
                setData([...res.data])
            })
        FileService.getListJob()
            .then(res => {
                setListJob([...res.data])
            })
    }, [])

    function onDownload(file_name) {
        const url = FileService.getDownloadFile(file_name)
        window.location.assign(url);
    }

    function InfoUser() {
        const localUser = sessionStorage.getItem("user")
        const user = JSON.parse(localUser)
        return user
    }

    function onUpload(e) {
        e.preventDefault()
        const user_id = InfoUser().user.id
        const formData = new FormData();
        formData.append(
            "filedata",
            file
        );
        formData.append(
            "user_id",
            user_id
        );
        formData.append(
            "module_id",
            module
        );
        Axios
            .post(BASE_URL + "/job/upload", formData)
            .then(res => {
                setMessage("Upload thành công!")
                let filter = {}
                if(InfoUser().user.role !== 'admin') filter.user_id = InfoUser().user.id
                FileService.getListFile(filter)
                    .then(res => {
                        setData([...res.data])
                    })
            })
            .catch(err => {
                setMessage("Upload thất bại!")
            });
    }

    function onChangeFile(e) {
        console.log(e.target.files[0]);
        setFile(e.target.files[0])
    }

    function onChangeJob(e) {
        const jobId = e.target.value
        setJob(jobId)
        FileService.getListModule(jobId)
            .then(res => {
                setListModule([...res.data])
            })
    }

    return <>
        <ModalNoti message={message} done={() => setMessage("")} />
        <form encType='multipart/form-data' method='post' action='/job/upload'>
            <Row>
                <Col xs={1} />
                <Col xs={3}>
                    <FormGroup>
                        <Label style={{ color: '#28b76b', fontSize: '20px' }}>
                            <b>Job</b>
                        </Label>
                        <Input type='select' value={job} onChange={(e) => onChangeJob(e)}>
                            <option>Chọn job</option>
                            {listJob.map((j, i) => {
                                return <option key={i} value={j.id}>{j.name}</option>
                            })}
                        </Input>
                    </FormGroup>
                </Col>
                <Col xs={3}>
                    <FormGroup>
                        <Label style={{ color: '#28b76b', fontSize: '20px' }}>
                            <b>Module</b>
                        </Label>
                        <Input type='select' value={module} onChange={(e) => setModule(e.target.value)}>
                            <option>Chọn module</option>
                            {listModule.map((m, i) => {
                                return <option key={i} value={m.id}>{m.name}</option>
                            })}
                        </Input>
                    </FormGroup>
                </Col>
                <Col xs={3}>
                    <FormGroup>
                        <Label style={{ color: '#28b76b', fontSize: '20px' }}>
                            <b>Upload</b>
                        </Label>
                        <Input
                            disabled={!job || !module ? true : false}
                            id="exampleFile"
                            name="filedata"
                            type="file"
                            onChange={(e) => onChangeFile(e)}
                        />
                        {/* <FormText>
                            This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.
                        </FormText> */}
                    </FormGroup>
                </Col>
                <Col xs={2}>
                    <Button className='mt-42' onClick={e => onUpload(e)}>Xác nhận</Button>
                </Col>
            </Row>
        </form>
        <div className="table-responsive mt-20 ">
            <Table hover striped bordered className="table-head-fixed">
                <thead className="thead_order upper">
                    <tr className="middle">
                        <th>STT</th>
                        <th>Tên nhân viên</th>
                        <th>Tên file</th>
                        <th>Tên Module</th>
                        <th>Thời gian upload</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody className="bodyTable">
                    {data.map((d, i) => {
                        return <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{d.user?.full_name}</td>
                            <td>{d.file_name}</td>
                            <td>{d.module?.name}</td>
                            <td>{convertCtime(d.ctime, "simple")}</td>
                            <td>
                                {InfoUser().user.role === 'admin' && <Button onClick={() => onDownload(d.file_name)}>Download</Button>}
                            </td>
                        </tr>
                    })}

                </tbody>
            </Table>
        </div>
    </>

}

export default ListFile;