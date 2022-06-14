import { TabContent, TabPane, Nav, NavItem, NavLink, Table, Input, Button, Row, Col, Label, Modal } from "reactstrap";
import Select from "react-select";
import { useState, useEffect, useRef } from "react";
import { convertCtime, ORDER_STATUS, USER_STATUS } from "../../../../Constances/const";
import UserService from "../../../User/Shared/UserService";
import ModalNoti from "../../../../Shared/Components/ModalNoti/ModalNoti";
import { TableLoading } from "../../../../Shared/Components/Loading/Loading.js"
import CreateUser from "../Modal/CreateUser";
import UpdateUser from "../Modal/UpdateUser";

const UserForm = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const headers = ["STT", "Tên nhân viên", 'Số điện thoại', 'Ngày bắt đầu làm việc'];
    const [listUser, setListUser] = useState([]);
    const [addUser, setAddUser] = useState(false)
    const [updateUser, setUpdateUser] = useState(false)
    const [modalUpdate, setModalUpdate] = useState()
    const [idUpdate, setIdUpdate] = useState()
    const [inputValue, setInputValue] = useState()
    const [initData, setInitData] = useState()
    const USERS_STATUS = [
        {
            label: "Đã nghỉ việc",
            value: "active",
        },
        {
            label: "Đang làm việc",
            value: "inactive",
        },

    ];
    const USERS_ROLE = [
        {
            label: "Nhân viên lễ tân",
            value: "hr",
        },
        {
            label: "Quản lý",
            value: "manager",
        },
        {
            label: "Nhân viên kĩ thuật",
            value: "staff",
        },
        {
            label: "quản lý dự án",
            value: "pm",
        }

    ];
    const onSelectUserRoleOption = (e) => {
        let role = e.value
        let listUserFilter = initData.filter(el => el.role === role)
        setListUser(listUserFilter)
    }
    const onSelectUserStatusOption = (e) => {

    }
    const [role, setRole] = useState(USERS_ROLE[1])
    const [value, setValue] = useState(USERS_STATUS[1])
    const [modalCreate, setModalCreate] = useState(false)
    const [messageNoti, setMessageNoti] = useState('')
    const [userName, setUserName] = useState('')
    const [userFullName, setUserFullName] = useState('')
    const [userPhone, setUserPhone] = useState('')
    const [userRole, setUserRole] = useState('')
    useEffect(() => {
        UserService.getListUser().then(res => {
            let users = res.data.filter(e => e.role != 'admin')
            setListUser(users)
            setInitData(users)
        })
    }, [addUser, updateUser]);
    const handleChangeUserName = (e) => {
        setUserName(e.target.value)
    }
    const handleChangeUserFullName = (e) => {
        setUserFullName(e.target.value)
    }
    const handleChangeUserPhone = (e) => {
        setUserPhone(e.target.value)
    }
    const handleChangeUserRole = (e) => {
        setUserRole(e.target.value)
    }
    const handleCreateUser = async () => {
        let payload = {
            username: userName,
            full_name: userFullName,
            role: userRole,
            phone: userPhone
        }
        await UserService.createUser(payload)
        setAddUser(true)
        setMessageNoti("Thêm thành công")
    }
    const handleUpdateUser = async () => {
        let payload = {
            username: userName,
            full_name: userFullName,
            role: userRole,
            phone: userPhone
        }
        await UserService.updateUser(idUpdate, payload)
        setUpdateUser(true)
        setMessageNoti("Sửa thành công")
    }
    const done = () => {
        setMessageNoti("")
    }
    const handleModalCreate = () => {
        setModalCreate(true)
    }
    const filterLocation = (e) => {
        setInputValue(e.target.value);
        if (e.target.value !== '') {
            const result = initData.filter((item) =>
                item.full_name.toUpperCase().includes(e.target.value.toUpperCase()));
            setListUser(result);
            console.log(e.target.value, listUser);
        } else {
            setListUser(initData);
        }
    };
    const handleModalUpdate = (e) => {
        UserService.getUser(e).then(res => {
            setUserName(res.data.username)
            setUserPhone(res.data.phone)
            setUserFullName(res.data.full_name)
            setUserRole(res.data.role)
            setIdUpdate(e)
            setModalUpdate(true)
        })

    }
    return (
        <div className="min-h-90 df-h-60 form-export">
            <UpdateUser
                userName={userName}
                userFullName={userFullName}
                userPhone={userPhone}
                userRole={userRole}
                setMessageNoti={setMessageNoti}
                modalUpdate={modalUpdate}
                setModalUpdate={setModalUpdate}
                handleChangeUserName={handleChangeUserName}
                handleChangeUserFullName={handleChangeUserFullName}
                handleChangeUserPhone={handleChangeUserPhone}
                handleChangeUserRole={handleChangeUserRole}
                handleCreateUser={handleCreateUser}
                handleUpdateUser={handleUpdateUser}
            />
            <CreateUser
                setMessageNoti={setMessageNoti}
                modalCreate={modalCreate}
                setModalCreate={setModalCreate}
                handleChangeUserName={handleChangeUserName}
                handleChangeUserFullName={handleChangeUserFullName}
                handleChangeUserPhone={handleChangeUserPhone}
                handleChangeUserRole={handleChangeUserRole}
                handleCreateUser={handleCreateUser}
            />

            <ModalNoti message={messageNoti} done={done} />
            <h1 className="upper middle">Quản lý nhân viên</h1>
            <div className="tableOrder mt-20">
                <Row>
                    <Col className="p-0" sm={3}>
                        <Input
                            defaultValue={inputValue}
                            onChange={filterLocation}
                            placeholder="Tìm kiếm theo tên nhân viên..." />
                    </Col>
                    <Col sm={2}>
                        <Select
                            options={USERS_STATUS}
                            defaultValue={value}
                            onChange={(e) => onSelectUserStatusOption(e)}
                        >
                        </Select>
                    </Col>
                    <Col sm={2}>
                        <Select
                            options={USERS_ROLE}
                            defaultValue={role}
                            onChange={(e) => onSelectUserRoleOption(e)}
                        >
                        </Select>
                    </Col>
                    <Col sm={3}></Col>
                    <Col sm={2}>
                        <Button
                            onClick={() => { handleModalCreate() }}
                        >
                            Thêm nhân viên
                        </Button>
                    </Col>
                </Row>
                <div className="table-responsive mt-20 ">
                    <Table hover striped bordered className="table-head-fixed">
                        <thead className="thead_order upper">
                            <tr className="middle">
                                <th>STT</th>
                                <th>Tên nhân viên</th>
                                <th>Chức vụ</th>
                                <th>Số điện thoại</th>
                                <th>Thời gian bắt đầu làm việc</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bodyTable"

                        >
                            {listUser ?
                                listUser.map((el, index) => (
                                    <tr
                                        key={el.id}

                                    >
                                        <td>{index + 1}</td>
                                        <td>
                                            {el.full_name}
                                        </td>
                                        <td>
                                            {el.role}
                                        </td>
                                        <td>
                                            {el.phone}
                                        </td>
                                        <td >
                                            {convertCtime(el.ctime, "simple")}
                                        </td>
                                        <td>
                                            <Button
                                                onClick={(e) => handleModalUpdate(el.id)}
                                            >Sửa</Button>
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
export default UserForm;
