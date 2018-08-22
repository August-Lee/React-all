import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Form,Input,Button} from 'element-react';
import 'element-theme-default';
var styleObj = {
   width:"100%"
}
class logForm extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            form: {
                pass: '',
                checkPass: '',
                age: ''
            },
            rules: {
                pass: [
                    { required: true, message: '请输入正确手机号', trigger: 'blur' },
                    { validator: (rule, value, callback) => {

                            if (value === '') {
                                callback(new Error('请输入账号'));
                            }else if(value.length<3){
                                callback(new Error('账号不能少于三位'));
                            } else {
                                callback();
                            }
                        } }
                ],
                age: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请输入密码'));
                            } else {
                                callback();
                            }
                        }, trigger: 'change' }
                ]
            }
        };
    }
    componentDidMount(){

    }
    handleSubmit(e) {
        e.preventDefault();
        this.refs.form.validate((valid) => {
            if (valid) {
                var params={uname:this.state.form.pass,pwd:this.state.form.age};
                axios.post('../login',params)
                    .then(res => {
                        if(res.data.code==0){
                            alert('submit Success!');
                            location.href="admin-echart.html"
                        }else{
                            alert("密码不正确!");
                        }
                        // this.setState({ posts });

                    });

            } else {
                console.log('error submit!!');
                return false;
            }
        });
    }

    handleReset(e) {
        e.preventDefault();

        this.refs.form.resetFields();
    }

    onChange(key, value) {
        this.setState({
            form: Object.assign({}, this.state.form, { [key]: value })
        });
    }

    render() {
        return (
            <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="100" className="demo-ruleForm">
                <Form.Item label="账号" prop="pass">
                    <Input value={this.state.form.pass} onChange={this.onChange.bind(this, 'pass')}></Input>
                </Form.Item>
                <Form.Item label="密码" prop="age">
                    <Input type="password" value={this.state.form.age} onChange={this.onChange.bind(this, 'age')}/>
                </Form.Item>

                <Form.Item>
                    <Button style={styleObj} class="btn-block" type="primary" onClick={this.handleSubmit.bind(this)}>提交</Button>
                </Form.Item>
            </Form>
        )
    }
}

export default logForm;