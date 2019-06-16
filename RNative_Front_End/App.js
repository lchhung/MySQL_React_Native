import React, { Component } from 'react'
import {Text, View, TextInput, TouchableOpacity } from 'react-native'
import axios from 'axios';

// Define url (local API)using IP addredd of the computer

var API_url = 'http://10.35.58.14:3000/users';

class App extends Component {
constructor(){
    super();
    this.state = {
    dataLoaded: [],
  };
  }
// Insert data into mySQLdatabase
dataPost(){
    //var url = 'http://10.35.58.14:3000/data';
    axios.post(API_url, {
      username: this.state.inputName,
      userage: this.state.inputAge
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    this.state.inputName = '';
    this.state.inputAge = '';
  };
 // Fetching data from mySQL database
  dataGet(){
    //var url = 'http://localhost:3000/data';
    //var url = 'http://10.35.58.14:3000/data';
    axios.get(API_url)
    .then((response) => {
      console.log(response.data);
      this.setState({dataLoaded: response.data}) 
    })
  };
  //Delete data
 dataDelete(){
    //var url = 'http://10.35.58.14:3000/data';
    axios.delete(API_url, { params:{
      //username: this.state.inputName,
	    username: this.state.inputName,
      userage: this.state.inputAge
    }})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    this.state.inputName = '';
    this.state.inputAge = '';
  };

 componentDidMount() {
      axios.get(API_url)
    .then((response) => {
      console.log(response.data);
      this.setState({
        dataLoaded: response.data,
      }) 
    })
  }


render() {

    const dataMySQL = this.state.dataLoaded.map((item, index)=>{
        var dataPrinted = ['Name: ',item.username,', Age: ', item.userage, ' years old'];
        return <Text style={{fontSize:20,fontWeight:'bold'}} key={index}>{dataPrinted}</Text>;
      })

    return (
<View>
<View style={{flexDirection:'column', alignItems:'center'}}>

<Text style={{marginTop:20, fontSize:20, fontWeight:'bold' }}>
RN - Local API - MySQL (Kaizentest)
</Text>

<TextInput
placeholder='Input username...'
style={{height: 55, width: 350, fontSize: 15}}
onChangeText={(inputName) => this.setState({inputName})}
value={this.state.inputName}
/>

<TextInput
placeholder='Input users age...'
style={{height: 55, width: 350, fontSize: 15}}
onChangeText={(inputAge) => this.setState({inputAge})}
value={this.state.inputAge}
/>
</View>

<View style={{flexDirection:'row', justifyContent:'center'}}>
<TouchableOpacity
style={{
    backgroundColor:'blue', borderRadius:10,
    flex:1, width:100, height:50, margin:20,
    flexDirection:'row', justifyContent:'center',
    alignItems:'center'
    }}
onPress={this.dataPost.bind(this)}
>
<Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>
POST
</Text>
</TouchableOpacity>

<TouchableOpacity
style={{
    backgroundColor:'green', borderRadius:10,
    flex:1, width:100, height:50, margin:20,
    flexDirection:'row', justifyContent:'center',
    alignItems:'center'
    }}
onPress={this.dataGet.bind(this)}
>
<Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>
GET
</Text>
</TouchableOpacity>


<TouchableOpacity
style={{
    backgroundColor:'green', borderRadius:10,
    flex:1, width:100, height:50, margin:20,
    flexDirection:'row', justifyContent:'center',
    alignItems:'center'
    }}
onPress={this.dataDelete.bind(this)}
>
<Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>
DELETE
</Text>
</TouchableOpacity>


</View>

<View style={{flexDirection:'column',alignItems:'center'}}>
{dataMySQL}
</View>

</View>
);
}
}

export default App;