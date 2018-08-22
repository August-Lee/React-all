import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Carousel, Menu, Button, Input, Icon} from 'element-react';
import 'element-theme-default';


    class Main extends React.Component{
        constructor(props) {
            super(props);

            this.state = {
                imgList: [
                    {
                        url: 'https://img.zcool.cn/community/0198ff55c4790b32f8755e66585796.jpg@1280w_1l_2o_100sh.webp',
                        name: '1',
                        title:'农夫小院',
                    },
                    {
                        url: 'https://img.zcool.cn/community/0198ff55c4790b32f8755e66585796.jpg@1280w_1l_2o_100sh.webp',
                        name: '1',
                        title:'农夫小院',
                    },
                    {
                        url: 'https://img.zcool.cn/community/0198ff55c4790b32f8755e66585796.jpg@1280w_1l_2o_100sh.webp',
                        name: '1',
                        title:'农夫小院',
                    },
                    {
                        url: 'https://img.zcool.cn/community/0198ff55c4790b32f8755e66585796.jpg@1280w_1l_2o_100sh.webp',
                        name: '1',
                        title:'农夫小院',
                    },
                    {
                        url: 'https://img.zcool.cn/community/0198ff55c4790b32f8755e66585796.jpg@1280w_1l_2o_100sh.webp',
                        name: '1',
                        title:'农夫小院',
                    },
                    {
                        url: 'https://img.zcool.cn/community/01d6a255c4783f6ac7255808283171.jpg@1280w_1l_2o_100sh.webp',
                        name: '2',
                        title:'农夫小院',
                    },
                    {
                        url: 'https://img.zcool.cn/community/0118cc55c4783f6ac72558087e7299.jpg@1280w_1l_2o_100sh.webp',
                        name: '3',
                        title:'农夫小院',
                    },
                    {
                        url: 'https://img.zcool.cn/community/0199a155c4790f32f8755e6604d4d5.jpg@1280w_1l_2o_100sh.jpg',
                        name: '4',
                        title:'农夫小院',
                    },
                ],
                styleObj: {
                    width: "1200px",
                    margin:"0 auto"
                },
                liSyl:{
                    margin:"30px",
                }
            }
            ;

        }
        componentDidMount() {
            var that=this;
            axios.get('../getList')
                .then(res => {
                    if(res.data.code==0){
                        that.setState({
                            imgList:res.data.data
                        })

                    }else{
                        alert("暂无数据");
                    }
                });
        }
        render() {
            return (
                <div class="container" style={this.state.styleObj}>
                    <ul>
                        {
                            this.state.imgList.map((item, index) => {
                                return (
                                    <li class="lf" style={this.state.liSyl}>
                                            <a class="output">
                                            <div class="front">
                                                <img src={item.img} alt=""/>
                                                <span>¥{item.price}</span> <br/>
                                                <em>{item.name}</em>
                                            </div>
                                            <div class="back"><i class="icon1_tmooc"></i>

                                            </div>
                                        </a>
                                    </li>
                                )
                            })
                        }

                        <li class="clear"></li>
                    </ul>
                </div>
        )
        }

    }
    class NavMenu extends React.Component{
        constructor(props) {
        super(props);
        this.state = {
                imgList:[
                    {url:'https://img.zcool.cn/community/0198ff55c4790b32f8755e66585796.jpg@1280w_1l_2o_100sh.webp',name:'首页',id:'1'},
                    {url:'https://img.zcool.cn/community/01d6a255c4783f6ac7255808283171.jpg@1280w_1l_2o_100sh.webp',name:'入住小院',id:'2'},
                    {url:'https://img.zcool.cn/community/0118cc55c4783f6ac72558087e7299.jpg@1280w_1l_2o_100sh.webp',name:'周边景点',id:'3'},
                    {url:'https://img.zcool.cn/community/0199a155c4790f32f8755e6604d4d5.jpg@1280w_1l_2o_100sh.jpg',name:'联系我们',id:'4'},
                ],
                styleObj:{
                    backGround:'#fff'
                },
                imgSye:{
                    width:"200px",
                    marginLeft:"20px",
                    marginTop:"10px"
                }
            };

        }
        componentDidMount(){
        }
        handleIconClick(){
        }
        render() {
            return (
                <div>
                <div className="logo lf">
                <img src="images/logo.png" style={this.state.imgSye} alt=""/>
                </div>
                <Menu defaultActive="1" className="el-menu-demo lf" mode="horizontal">
                {
                    this.state.imgList.map((item, index) => {
                        return (
                            <Menu.Item key={index} index={item.id}>{item.name}</Menu.Item>
                        )
                    })
                }
                </Menu>
                <div className="search lf">
                <Input
                icon="search"
                placeholder="请输入小院名称"
                onIconClick={this.handleIconClick.bind(this)}
                />
                </div>
                <div className="login rt">
                登录
                </div>
                </div>
            )
        }
    }
    class Slide extends React.Component{
        constructor(props) {
        super(props);
        this.state = {
            imgList:[

                ],
                    styleObj:{
                        width:"100%",
                        minWidth:"1200px",
                        height:"400px"
                    }
                };
        }
        componentDidMount(){
            var that=this;
            axios.get('../getSlide')
                .then(res => {
                    if(res.data.code==0){
                        that.setState({
                            imgList:res.data.data
                        })
                    }else{
                        alert("暂无数据");
                    }
                });
        }
        render() {
            return (
                <div className="medium">
                    <Carousel height="400px">
                    {
                        this.state.imgList.map((item, index) => {
                            return (
                                <Carousel.Item key={index}>
                                    <img src={item.url} alt={item.uname} style={this.state.styleObj}/>
                                </Carousel.Item>
                            )
                        })
                    }
                    </Carousel>
                </div>
            )
        }
    }
    class Footer extends React.Component{
        constructor(props) {
        super(props);
        this.state = {
            imgList:[

                ],
                    styleObj:{
                        margin:"0 auto",
                        textAlign:"center"
                    }
                };
        }
        componentDidMount(){
        }
        render() {
            return (
                <div className="medium" style={this.state.styleObj}>
                    <p>版权所有@August 2018</p>
                    <p>广告合作联系18232556494@163.com</p>
                </div>
            )
        }
    }



    ReactDOM.render(
        <NavMenu></NavMenu>,
        document.getElementById('header')
    );
    ReactDOM.render(
        <Slide></Slide>,
        document.getElementById('slide')
    );
    ReactDOM.render(
        <Main></Main>,
        document.getElementById('main')
    );
    ReactDOM.render(
        <Footer></Footer>,
        document.getElementById('footer')
    );