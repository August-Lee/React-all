import React from 'react';
import ReactDOM from 'react-dom';
import {Layout,Menu,Table,Button,Dialog,Form,Input,Message,MessageBox} from 'element-react';
import 'element-theme-default';
import axios from "axios/index";
import { createStore} from 'redux';
import { connect } from 'react-redux';

function counter(state = 0, action) {
    state=action;
    return state
    // switch (action.type) {
    //     case 'INCREMENT':
    //         return state + 1;
    //     case 'DECREMENT':
    //         return state - 1;
    //     default:
    //         return state;
    // }
}
const store = createStore(counter);

// store.dispatch({type: 'DECREMENT'})
// // 1





var hidden="true";

class LeftMenu extends React.Component{
    render() {
        return (
            <Layout.Row className="tac">
                <Layout.Col>
                    <Menu defaultActive="2" className="el-menu-vertical-demo" onOpen={this.onOpen.bind(this)} onClose={this.onClose.bind(this)}>
                        <Menu.SubMenu index="1" title={<span><i className="el-icon-message"></i>导航一</span>}>
                            <Menu.ItemGroup title="分组一">
                                <Menu.Item index="1-1">用户管理</Menu.Item>
                                <Menu.Item index="1-2">主页管理</Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup title="分组2">
                                <Menu.Item index="1-3">选项3</Menu.Item>
                            </Menu.ItemGroup>
                        </Menu.SubMenu>
                        <Menu.Item index="2"><i className="el-icon-menu"></i>导航二</Menu.Item>
                        <Menu.Item index="3"><i className="el-icon-setting"></i>导航三</Menu.Item>
                    </Menu>
                </Layout.Col>
            </Layout.Row>
        )
    }

    onOpen() {

    }

    onClose() {

    }

}

class TopMenu extends React.Component{

    constructor(props) {
        super(props);
        this.state = {count: hidden};
    }

    render() {
        return (
            <div className="header">
                <img src="./images/logo.png" alt="" className="lf"/>
                <i className="el-icon-menu lf" onClick={this.toggleLeft.bind(this)}></i>
                <Menu theme="dark" defaultActive="1" className="el-menu-demo lf topMenu" mode="horizontal" onSelect={this.onSelect.bind(this)}>
                    <Menu.Item index="1">处理中心</Menu.Item>
                    <Menu.SubMenu index="2" title="我的工作台">
                        <Menu.Item index="2-1">选项1</Menu.Item>
                        <Menu.Item index="2-2">选项2</Menu.Item>
                        <Menu.Item index="2-3">选项3</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.Item index="3">订单管理</Menu.Item>
                </Menu>
                <div className="line clear"></div>
            </div>
        )
    }
    toggleLeft(){
        console.log(this.state.count);
    }
    onSelect() {

    }

}

class RightTable extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    label: "ID",
                    prop: "_id",
                    width: 300
                },
                {
                    label: "姓名",
                    prop: "uname",
                    width: 300
                },
                {
                    label: "密码",
                    prop: "pwd",
                    width: 300
                },
                {
                    label: "操作",
                    fixed: 'right',
                    prop: "_id",
                    width: 100,
                    render: (row,column,index)=>{
                        return <span><Button type="text" size="small" onClick={this.showDetail.bind(this,row,index)}>编辑</Button><Button onClick={this.Delete.bind(this,row,index)} type="text" size="small">删除</Button></span>
                    }
                }
            ],
            data: []
        }
        store.subscribe(()=>{
            this.setState({
                data:store.getState().data
            })
        })
    }
    componentDidMount(){
        var that=this;
        axios.get('../getUser')
            .then(res => {
                if(res.data.code==0){
                    that.setState({
                        data:res.data.data
                    })
                }else{
                    alert("暂无数据");
                }

            });
    }
    render() {
        return (
            <div className="tableOut">
                <Button size="small" className="add" onClick={this.addUser.bind(this)}>添加用户</Button>
                <Table
                    style={{width: '100%'}}
                    columns={this.state.columns}
                    data={this.state.data}
                />
            </div>

        )
    }
    showDetail(row,index){
        store.dispatch({type: 'CHANGE',dialogVisible: true,list:row,title:'修改用户',data:this.state.data})
    }
    Delete(row,index){
        MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            type: 'warning'
        }).then(() => {
            axios.post('../deleteUser',row)
                .then(res => {
                    var data=this.state.data;
                    data.splice(index, 1);
                    this.setState({
                        data: data
                    })
                    Message({
                        type: 'success',
                        message: '删除成功!'
                    });
                });

        }).catch(() => {
            Message({
                type: 'info',
                message: '已取消删除'
            });
        });

    }
    addUser(){
        store.dispatch({type: 'ADD',dialogVisible: true,list:{
                uname:'',
                pwd:'',
            },title:'添加用户',data:this.state.data})
    }
}

class Modal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: false,
            title:'编辑用户信息',
            list:{
                uname:'',
                pwd:'',
            }
        }
        store.subscribe(()=>{
            this.setState(store.getState())
        })
    }
    render() {
        return (
            <div>
                <Dialog
                    title={this.state.title}
                    size="tiny"
                    visible={ this.state.dialogVisible }
                    onCancel={ () => this.setState({ dialogVisible: false }) }
                    lockScroll={ false }
                >
                    <Dialog.Body>
                        <Form model={this.state.list} onSubmit={this.onSubmit.bind(this)}>
                            <Form.Item label="名称">
                                <Input value={this.state.list.uname} onChange={this.onChange.bind(this, 'uname')}></Input>
                            </Form.Item>
                            <Form.Item label="密码">
                                <Input value={this.state.list.pwd} onChange={this.onChange.bind(this, 'pwd')}></Input>
                            </Form.Item>
                        </Form>
                    </Dialog.Body>
                    <Dialog.Footer className="dialog-footer">
                        <Button onClick={ () => this.setState({ dialogVisible: false }) }>取消</Button>
                        <Button type="primary" onClick={this.sendList.bind(this)}>确定</Button>
                    </Dialog.Footer>
                </Dialog>
            </div>
        )
    }
    onSubmit(e) {
        e.preventDefault();
    }
    onChange(key, value) {
        this.state.list[key] = value;
        this.forceUpdate();
    }
    sendList(){
        if(store.getState().type=="ADD"){
            this.setState({ dialogVisible: false })
            axios.post('../sendList',this.state.list)
                .then(res => {
                    var params=res.data.ops[0];
                    var list=store.getState().data;
                    list.push(params);
                    Message({
                        message: '恭喜你，添加成功',
                        type: 'success'
                    });
                    store.dispatch({type: 'ADD',dialogVisible: false,list:{
                            uname:'',
                            pwd:'',
                        },title:'添加用户',data:list})
                });
        }else{
            this.setState({ dialogVisible: false });
            console.log(this.state.list);
            axios.post('../updateUser',this.state.list)
                .then(res => {
                    Message({
                        message: '恭喜你，修改成功',
                        type: 'success'
                    });
                });
        }

    }}

ReactDOM.render(
    <LeftMenu></LeftMenu>,
    document.getElementById('left')
);
ReactDOM.render(
    <TopMenu></TopMenu>,
    document.getElementById('top')
);
ReactDOM.render(
    <RightTable></RightTable>,
    document.getElementById('right')
);
ReactDOM.render(
    <Modal></Modal>,
    document.getElementById('modal')
);