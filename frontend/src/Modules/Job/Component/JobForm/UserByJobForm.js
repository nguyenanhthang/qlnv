import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from "react-router-dom";
import { Button, Form, Row, Col, Table } from 'reactstrap';
import JobService from '../../Shared/JobService'
import UserSevice from '../../../User/Shared/UserService'
import UpdateUser from '../../../User/Components/Modal/UpdateUser'
const UserByJob = (props) => {
    let { id } = useParams()
    const [job, setJob] = useState()
    const [userByJob, setUserByJob] = useState()
    const [listModule, setListModule] = useState()
    const [modalUpdate, setModalUpdate] = useState(false)
    const [userName, setUserName] = useState('')
    const [userFullName, setUserFullName] = useState('')
    const [userPhone, setUserPhone] = useState('')
    const [userRole, setUserRole] = useState('')

    useEffect(() => {
        JobService.getJob(id).then(res => {
            setListModule(res.data.modules)
            let userUnique = res.data.users.filter((e, index) => res.data.users.findIndex((el) => e.id === el.id) === index)
            setUserByJob(userUnique)
            setJob(res.data.name)
        }).catch(err => {
            console.log(err);
        })

    }, [])
    const getUserInfo = (el) => {
        UserSevice.getUser(el).then(res => {
            console.log(res.data);
            setUserFullName(res.data.full_name)
            setUserRole(res.data.role)
            setUserPhone(res.data.phone)
        })
        alert('chua lam xong')
    }
    return (
        <div>
           
            <Row>
                <Col sm={1}>
                    <Link to={`/app/job`}>
                        <Button>Quay lại</Button>
                    </Link>
                </Col>
                <Col>
                    <h1 className="upper middle">Chi tiết dự án {job}</h1></Col>
                <h5 className='middle'>Số người tham gia: {userByJob && userByJob.length}</h5>
                <Table>
                    <thead className="thead_order upper">
                        <tr className="middle">
                            <th>STT</th>
                            <th>Tên </th>
                            <th>Chức vụ</th>
                        </tr>
                    </thead>
                    <tbody className="bodyTable">
                        {userByJob && userByJob.map((e, index) =>
                        (
                            <tr
                                key={e.id}
                            >
                                <td>{index + 1}</td>
                                <td
                                    onClick={(el) => getUserInfo(e.id)}
                                >{e.full_name}</td>
                                <td>{e.role}</td>
                            </tr>
                        )
                        )}
                    </tbody>
                </Table>

            </Row>
            <Form>
                <div className="table-responsive mt-20 ">
                    <Table>
                        <thead className="thead_order upper">
                            <tr className="middle">
                                <th>STT</th>
                                <th>Module thực hiện</th>
                                <th>Tên người thực hiện</th>
                                <th>Trạng thái công việc</th>
                                <th>Thời gian bắt đầu công việc</th>
                            </tr>
                        </thead>
                        <tbody className="bodyTable">
                            {(listModule && userByJob) &&
                                listModule.map((e, index) => (
                                    <tr
                                        key={e.id}
                                    >
                                        <td >
                                            {index + 1}
                                        </td>
                                        <td>
                                            {e.name}
                                        </td>
                                        <td>
                                            {e.users?.map(el => {
                                                return <div>{el.full_name}</div>
                                            })}

                                        </td>
                                        <td>
                                            {e.status}
                                        </td>
                                        <td>
                                            {new Date(e.ctime).toLocaleDateString("en-GB")}
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

export default UserByJob;