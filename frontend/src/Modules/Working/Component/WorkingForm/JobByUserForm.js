import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from "react-router-dom";
import { Button, Form, Row, Col, Table } from 'reactstrap';
import JobService from '../../../Job/Shared/JobService'
import WorkingService from '../../Shared/WorkingService'
import UserSevice from '../../../User/Shared/UserService'
const JobByUser = (props) => {
    const [job, setJob] = useState()
    const [listJob, setListJob] = useState()
    const [userByJob, setUserByJob] = useState()
    const [listModule, setListModule] = useState()
    const [modalUpdate, setModalUpdate] = useState(false)
    const [userName, setUserName] = useState('')
    const [userFullName, setUserFullName] = useState('')
    const [userPhone, setUserPhone] = useState('')
    const [userRole, setUserRole] = useState('')
    useEffect(async () => {
        let user = await JSON.parse(window.sessionStorage.getItem('user')).user
        let userByJob = await (await WorkingService.getJobByUser(user.id)).data
        let userUnique = userByJob.filter((e, index) => userByJob.findIndex((el) => e.job_id === el.job_id) === index)
        await setUserByJob(userUnique)
        let listJob = await (await JobService.getListJob()).data
        await setListJob(listJob)
    }, [])
    const getJobById = (job_id) =>{
      let job =  listJob.filter(e=>e.id===job_id)
      return job
    }
    return (
        <div>

            <Row>
                <Col sm={1}>
                    <Link to={`/app/working`}>
                        <Button>Quay lại</Button>
                    </Link>
                </Col>
                <Col>
                    <h1 className="upper middle">Công việc của tôi</h1></Col>
            </Row>
            <Form>
                <div className="table-responsive mt-20 ">
                    <Table>
                        <thead className="thead_order upper">
                            <tr className="middle">
                                <th>STT</th>
                                <th>Tên công việc</th>
                                <th>Trạng thái công việc</th>
                                <th>Thời gian bắt đầu</th>
                                <th>Thời gian kết thúc</th>
                            </tr>
                        </thead>
                       
                        <tbody className="bodyTable">
                            {(userByJob && listJob) &&
                                userByJob.map((e, index) => (
                                    <tr
                                    key={e.id}
                                >
                                    <td >
                                        {index + 1}
                                    </td>
                                    <td >
                                    <Link 
                                    to={`/app/working/user/module/job/${e.job_id}`}
                                    state={{id:e.job_id,today:'12345'}}
                                    >
                                        {getJobById(e.job_id)[0]?.name}
                                    </Link>
                                </td>
                                    <td>
                                    {getJobById(e.job_id)[0]?.status}
                                    </td>
                                    <td>
                                        {new Date(e.ctime).toLocaleDateString("en-GB")}
                                    </td>
                                    <td>
                                    {new Date(getJobById(e.job_id)[0]?.mtime).toLocaleDateString("en-GB")}
                                    </td>
                                </tr>
                                )
                                )}
                        </tbody>
                    </Table>
                </div>
            </Form>
            <div >
            </div>
        </div>
    );
}

export default JobByUser;