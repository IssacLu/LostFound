import React, { Component } from 'react';
import './App.css';
import './Home.css';
import SearchImg from './img/Search.png';
import UserImg from './img/user.png';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      //title:'',
     // name:'',
     // time:'',
     // place:''
        data:[],
        dislpay : true,
    };
    this.ChangeFound = this.ChangeFound.bind(this);
  }
  //页面加载完之后就显示
   componentDidMount() {
    this.lostInquire();
  }
  //请求api
  lostInquire = () =>{
    fetch('https://open.twtstudio.com/api/v1/lostfound/lost?page=1').then(
      (response) =>response.json()).then(
      (jsondata) =>{
        //console.log(jsondata.data);//测试正常
        // console.log(jsondata.data[1].picture)
        this.setState({
           //title:jsondata.title,
           //name:jsondata.name,
           //time:jsondata.time,
           //place:jsondata.place,
           data:jsondata.data,     
        })
         
      })
      .catch((error)=>{
        console.log(error);
      });
  };
  ChangeFound(e){
    e.preventDefault();
   e.target.style.display = 'none' 
    console.log(0);
  };
render() {
  const lostShow = this.state.data.map((icon,key)=>{
    let ImageUrl =`https://open.twtstudio.com/${icon.picture}`
    //console.log(ImageUrl) 
    return(
      <div className="home">
          <img src={ImageUrl}/>
          <div>名称：{icon.title}</div>
          <p>姓名：{icon.name}</p>
          <p>时间：{icon.time}</p>
          <p>地点：{icon.place}</p>
      </div>
    )
  })
    return (
      <div className="App">
        <div className="header">
          <p>失物招领</p>
          <img src={SearchImg} className="img1"/>
          <img src={UserImg} className="img2"/>
        </div>
        <a href=""><div className="lost">丢失</div></a>
        <a><div className="found" onClick ={this.ChangeFound}>捡到</div></a>
        <div>{lostShow}</div>
      </div>
    );
  };
};

export default App;