import React from 'react';
import ReactDOM from 'react-dom';
import {Layout,Menu,Table,Button,Dialog,Form,Input,Message,MessageBox,Icon,Tabs,Upload} from 'element-react';
import 'element-theme-default';
import axios from "axios/index";
import { createStore} from 'redux';
import { connect } from 'react-redux';

function counter(state = 0, action) {
    state=action;
    return state
}
const store = createStore(counter);

var hidden="true";

class LeftMenu extends React.Component{
    render() {
        return (
            <Layout.Row className="tac">
                <Layout.Col>
                    <Menu defaultActive="2" className="el-menu-vertical-demo" onSelect={this.onSelect.bind(this)} onOpen={this.onOpen.bind(this)} onClose={this.onClose.bind(this)}>
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

    onOpen() {}
    onClose() {}
    onSelect(index){
        if(index=='1-1'){
            location.href='admin-index.html'
        }else if(index='1-2'){
            location.href='admin-img.html'
        }
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
                    label: "名称",
                    prop: "uname",
                    width: 300
                },
                {
                    label: "链接",
                    prop: "url",
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
            courtCol:[
                {
                    label: "ID",
                    prop: "_id",
                    width: 150
                },
                {
                    label: "名称",
                    prop: "name",
                    width: 150
                },
                {
                    label: "图片",
                    prop: "img",
                    width: 150
                },
                {
                    label: "价格",
                    prop: "price",
                    width: 150
                },
                {
                    label: "入住次数",
                    prop: "time",
                    width: 150
                },
                {
                    label: "更新时间",
                    prop: "update",
                    width: 150
                },
                {
                    label: "操作",
                    fixed: 'right',
                    prop: "_id",
                    width: 100,
                    render: (row,column,index)=>{
                        return <span><Button type="text" size="small" onClick={this.showListDetail.bind(this,row,index)}>编辑</Button><Button onClick={this.DeleteList.bind(this,row,index)} type="text" size="small">删除</Button></span>
                    }
                }
            ],
            courtData:[],
            data: [],

        }
        store.subscribe(()=>{
            this.setState({
                data:store.getState().data
            })
        })
    }
    componentDidMount(){
        var that=this;
        axios.get('../getSlide')
            .then(res => {
                if(res.data.code==0){
                    that.setState({
                        data:res.data.data
                    })

                }else{
                    alert("暂无数据");
                }
            });
        axios.get('../getList')
            .then(res => {
                if(res.data.code==0){
                    that.setState({
                        courtData:res.data.data
                    })

                }else{
                    alert("暂无数据");
                }
            });
    }
    render() {
        const label = <span><Icon name="date" />轮播图管理</span>

        return (
            <Tabs type="border-card" activeName="1">
                <Tabs.Pane label={label} name="1">
                    <div className="tableOut">
                        <Button size="small" className="add" onClick={this.addUser.bind(this)}>添加轮播图</Button>
                        <Table
                            style={{width: '100%'}}
                            columns={this.state.columns}
                            data={this.state.data}
                        />
                    </div>
                </Tabs.Pane>
                <Tabs.Pane label="小院列表" name="2">
                    <div className="tableOut">
                        <Button size="small" className="add" onClick={this.addCourt.bind(this)}>添加小院</Button>
                        <Table
                            style={{width: '100%'}}
                            columns={this.state.courtCol}
                            data={this.state.courtData}
                        />
                    </div>
                </Tabs.Pane>
            </Tabs>
        )
    }

    showDetail(row,index){
        store.dispatch({type: 'CHANGE',dialogVisible: true,list:row,title:'修改用户',data:this.state.data,courtData:this.state.courtData})
    }
    showListDetail(row,index){
        store.dispatch({type: 'CHANGEC',dialogVisible: true,list:row,title:'修改小院详细信息',data:this.state.data,courtData:this.state.courtData})
    }
    Delete(row,index){
        MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            type: 'warning'
        }).then(() => {
            axios.post('../deleteSlide',row)
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
    DeleteList(row,index){
        console.log(row);
        MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            type: 'warning'
        }).then(() => {
            axios.post('../deleteList',row)
                .then(res => {
                    var data=this.state. courtData;
                    console.log(data);
                    data.splice(index, 1);
                    this.setState({
                        courtData: data
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
                url:'',
                uname:'',
            },title:'添加轮播图',data:this.state.data,courtData:this.state.courtData})
    }
    addCourt(){
        store.dispatch({type: 'ADDCourt',dialogVisible: true,list:{name:'',img:'',detail:[],price:'',time:'',update:''}
            ,title:'添加小院',courtData:this.state.courtData,data:this.state.data})
    }
}

class Modal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: false,
            title:'编辑轮播图信息',
            list:{
                url:'',
                name:'',
            }
        }
        store.subscribe(()=>{
            this.setState(store.getState());
        })
    }

    render() {
        if(this.state.type=='ADD'||this.state.type=='CHANGE'){
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
                                <Form.Item label="链接">
                                    <Input value={this.state.list.url} onChange={this.onChange.bind(this, 'url')}></Input>
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
        }else {
           // const fileList=this.state.list.detail;
            console.log(this.state.list);
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
                                    <Input value={this.state.list.name} onChange={this.onChange.bind(this, 'name')}></Input>
                                </Form.Item>
                                <Form.Item label="图片">
                                    <Input value={this.state.list.img} onChange={this.onChange.bind(this, 'img')}></Input>
                                </Form.Item>
                                <Upload
                                    className="upload-demo"
                                    action="../upload"
                                    onPreview={file => this.handlePreview(file)}
                                    onRemove={(file, fileList) => this.handleRemove(file, fileList)}
                                    onChange={(file, fileList) => this.handleChange(file, fileList)}
                                    fileList={this.state.list.detail}
                                    listType="picture"
                                    tip={<div className="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>}
                                >
                                    <Button size="small" type="primary">点击上传</Button>
                                </Upload>
                                <Form.Item label="价格">
                                    <Input value={this.state.list.price} onChange={this.onChange.bind(this, 'price')}></Input>
                                </Form.Item>
                                <Form.Item label="次数">
                                    <Input value={this.state.list.time} onChange={this.onChange.bind(this, 'time')}></Input>
                                </Form.Item>
                            </Form>
                        </Dialog.Body>
                        <Dialog.Footer className="dialog-footer">
                            <Button onClick={ () => this.setState({ dialogVisible: false }) }>取消</Button>
                            <Button type="primary" onClick={this.addList.bind(this)}>确定</Button>
                        </Dialog.Footer>
                    </Dialog>
                </div>
            )
        }

    }
    handleChange(file, fileList) {
        this.state.list.detail=fileList;
        console.log(this.state.list)
    }
    handleRemove(file, fileList) {
        this.state.list.detail=fileList;
        console.log(this.state.list)
    }
    handlePreview(file) {
        console.log(file);
    }
    onSubmit(e) {
        e.preventDefault();
    }
    onChange(key, value) {
        this.state.list[key] = value;
        this.forceUpdate();
    }
    addList(){
        if(this.state.type=="ADDCourt"){
            this.setState({ dialogVisible: false })
            axios.post('../addList',this.state.list)
                .then(res => {
                    var params=res.data.ops[0];
                    var list=store.getState().courtData;
                    list.push(params);
                    Message({
                        message: '恭喜你，添加成功',
                        type: 'success'
                    });
                    var changelist=store.getState().list;
                    var changedata=store.getState().data;
                    store.dispatch({type: 'ADDCourt',dialogVisible: false,list:changelist,title:'添加轮播图',data:changedata,courtData:list})
                });
        }else{
            this.setState({ dialogVisible: false });
            axios.post('../updateList',this.state.list)
                .then(res => {
                    Message({
                        message: '恭喜你，修改成功',
                        type: 'success'
                    });
                });
        }

    }
    sendList(){
        if(store.getState().type=="ADD"){
            this.setState({ dialogVisible: false })
            axios.post('../addSlide',this.state.list)
                .then(res => {
                    var params=res.data.ops[0];
                    var list=store.getState().Data;

                    list.push(params);
                    Message({
                        message: '恭喜你，添加成功',
                        type: 'success'
                    });
                    store.dispatch({type: 'ADD',dialogVisible: false,list:{
                            uname:'',
                            url:'',
                        },title:'添加轮播图',data:list})
                });
        }else{
            this.setState({ dialogVisible: false });
            console.log(this.state.list);
            axios.post('../updateList',this.state.list)
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