import React, { Component } from 'react';
import './App.css';
import './Home.css';
import SearchImg from './img/Search.png';
import UserImg from './img/user.png';
import NoneImg from './img/none.jpg';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
        data:[1,2],
        page:2,
        value :"",
        username:'',
    };
  }
  //页面加载完之后就显示
  componentDidMount() {
    this.lostFirstPage();
  } 
  lostFirstPage = () =>{
    fetch(`https://open.twtstudio.com/api/v1/lostfound/lost?page=1`).then(
      (response) =>response.json()).then(
      (jsondata) =>{
        //console.log(jsondata.data);//测试正常
        this.setState({
           data:jsondata.data,   
        })  
      })
      .catch((error)=>{
        console.log(error);
      });
  };
  foundFirstPage = () =>{
    fetch(`https://open.twtstudio.com/api/v1/lostfound/found?page=1`).then(
      (response) =>response.json()).then(
      (jsondata) =>{
        this.setState({
           data:jsondata.data,     
        })   
      })
      .catch((error)=>{
        console.log(error);
      });
  };
  //请求丢失的api
  lostInquire = () =>{
    fetch(`https://open.twtstudio.com/api/v1/lostfound/lost?page=${this.state.page}`).then(
      (response) =>response.json()).then(
      (jsondata) =>{
        //console.log(jsondata.data);//测试正常
        this.setState({
           data:jsondata.data,   
           page : this.state.page+1,  
        })  
      })
      .catch((error)=>{
        console.log(error);
      });
  };
  //请求捡到的api
  foundInquire = () =>{
    fetch(`https://open.twtstudio.com/api/v1/lostfound/found?page=${this.state.page}`).then(
      (response) =>response.json()).then(
      (jsondata) =>{
        this.setState({
           data:jsondata.data,
           page : this.state.page+1,       
        })   
      })
      .catch((error)=>{
        console.log(error);
      });
  };
   handleChange(e){
    this.setState({value:e.target.value})
  }

  //请求搜索api
  SearchInquire = ( ) =>{
    fetch(`https://open.twtstudio.com/api/v1/lostfound/search?keyword=${this.state.value}`).then(
            (response) =>response.json()).then(
            (jsondata) =>{
                this.setState({
                     data:jsondata.data,
                })
            })
            .catch((error) =>{
               console.log(error);
        });
  };

  //遍历获取api内容
render() {
  //console.log(this.state.data)
  //最后一页的记得重写，hahhah
  /* if(this.state.data.length === 0){
      alert("已经是最后一页")   
    }
    */
  const lostFoundShow = this.state.data.map((icon,key)=>{
    let ImageUrl =`https://open.twtstudio.com/${icon.picture}` 
    if(icon.picture==null || icon.picture == ''){
      return(
        <div className="home">
          <img src={NoneImg} />
          <div>名称：{icon.title}</div>
          <p>姓名：{icon.name}</p>
          <p>时间：{icon.time}</p>
          <p>地点：{icon.place}</p>
      </div>
      )
    } 
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
        <img src={UserImg} className="img2"/>
      </div>
      
      <div className="lost" onClick ={this.lostFirstPage}>丢失</div>
      <div className="found" onClick ={this.foundFirstPage}>捡到</div>
      <form>
        <input value={this.state.value} onChange={this.handleChange.bind(this)} className="search"/>
        <input type="button" value="搜索" onClick={this.SearchInquire.bind(this)} className="button" />
      </form>
        <div className="content">{lostFoundShow}</div>
        <div className="load" onClick={this.lostInquire}>点击加载下一页</div>
    </div>
   );
  };
};

export default App;