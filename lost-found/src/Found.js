import  React , { Component } from 'react';
import  './Home.css';
class  Found extends Component{
    constructor(props){
        super(props);
        this.state= {
         found : [],
        }
	}
	componentDidMount() {
    this.FoundInquire();
  }
	FoundInquire = () =>{
		fetch('https://open.twtstudio.com/api/v1/lostfound/found?page=1').then(
            (response) =>response.json()).then(
            (founddata) =>{
                this.setState({
                     found  ：founddata.data,
                })
            })
            .catch((error) =>{
               console.log(error);
        });
	};
	render(){
		const foundShow = this.state.found.map((icon,key) =>{
			let foundImageUrl = `https://open.twtstudio.com/${icon.picture}`
			return(
				<div className ="home">
                  <img src={foundImageUrl} />
                  <div>名称：{icon.title}</div>
                  <p>姓名：{icon.name}</p>
                  <p>时间：{icon.time}</p>
                  <p>地点：{icon.place}</p>
				</div>
			)
		})
		return (
           <div>
              <div>{foundShow}</div>
           </div>
        )
	}
}

export default Found;