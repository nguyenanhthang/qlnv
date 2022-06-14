import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { LOCALSTORAGE } from '../../../../Constances/const';
import { Link, useLocation } from "react-router-dom";
import { Button, Form, Row, Col, Table } from 'reactstrap';
import JobService from '../../../Job/Shared/JobService'
import WorkingService from '../../Shared/WorkingService'
import UserSevice from '../../../User/Shared/UserService'
const ModuleForm = (props) => {
    let params = useParams()
    const location = useLocation();
    const [listModule, setListModule] = useState()
    const [moduleStatus, setModuleStatus] = useState()
    const [check,setCheck] = useState(false)
    useEffect(async () => {
        let user = await JSON.parse(window.sessionStorage.getItem(LOCALSTORAGE.USER)).user
        let listModule = await (await JobService.getListModuleByUser(user.id)).data
        setListModule(listModule)
    }, [check])

    const handleFixModule = async (e) => {
        let payload = {
            status: 'running'
        }
        await JobService.updateModule(e, payload)
        await setCheck(!check)
    }
    const handlePauseModule = async (e) => {
        let payload = {
            status: 'pause'
        }
        await JobService.updateModule(e, payload)
        await setCheck(!check)
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
                    <h1 className="upper middle">module của tôi</h1></Col>
            </Row>
            <Form>
                <div className="table-responsive mt-20 ">
                    <Table>
                        <thead className="thead_order upper">
                            <tr className="middle">
                                <th>STT</th>
                                <th>Tên module</th>
                                <th>Trạng thái module</th>
                                <th>Thời gian bắt đầu</th>
                                <th>Thời gian kết thúc</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>

                        <tbody className="bodyTable">
                            {listModule &&
                                listModule.map((el, index) => (
                                    <tr
                                        key={el.id}
                                    >
                                        <td >
                                            {index + 1}
                                        </td>
                                        <td >
                                            {el.name}
                                        </td>
                                        <td>
                                            {el.status}
                                        </td>
                                        <td>
                                            {new Date(el.ctime).toLocaleDateString("en-GB")}
                                        </td>
                                        <td>
                                            {el.deadline?.split('/').reverse().join('/')}
                                        </td>
                                        <td>
                                            <Button onClick={(e) => handleFixModule(el.id)}>Thực hiện</Button>
                                            <Button onClick={(e) => handlePauseModule(el.id)} className='ml-5'>Tạm dừng</Button>
                                        </td>
                                    </tr>
                                )
                                )}
                        </tbody>
                    </Table>
                </div>
            </Form>

        </div>
    );
}

export default ModuleForm;