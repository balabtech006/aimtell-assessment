import React from 'react';
import Table from 'react-bootstrap/Table';
import {Row,Col,Container,Button} from 'react-bootstrap';
import Common from '../common/common'

class TableModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isFetched: false, dataBody : []};
    // This binding is necessary to make `this` work in the callback    
    this.loadData = this.loadData.bind(this);
  };
  loadData() { 
     console.log('The link was clicked.'); 
     // Fetch API from End point
     fetch(Common.baseURL) // Load base Url from common file
     .then(res => res.json()) // JSON Conversion 
     .then(
      (result) => {
        let content = result.sites; // Assign Master Array
        this.setState({
          isFetched : true,
          dataBody : content
        }); // Re Intillize State value
      },
      (error) => {
        // Error Handler
        console.log(error)
        this.setState({
          isFetched : false
        });
      });
  };
  render() {
    const isFetched = this.state.isFetched; // Trigger Click Type
    return (
      <div className="App">
       <Container>
       <Row>
       <Col  md={12} className="text-center">
        <h2>Front-End Assessment</h2>
       </Col>
        </Row>
       <Row>
       <Col  md={12} className="text-right"><Button onClick={this.loadData} >Load Datas</Button>
       </Col>
        </Row>
        <Row>
        <Table striped bordered hover>
          <thead className="text-left">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody className="text-left">
            {this.state.isFetched ? ( // If load Trigger
            this.state.dataBody.map((item,index) => {
                    return( 
                    <tr key={index}><td>{item.id}</td><td>{item.name}</td><td><a target="_blank" href ={item.url}>{item.url}</a></td></tr>
                    ); // Set Table Value
                    })
            ) : ( // Else, No Record set
              <tr key = '1'><td colSpan='3'> No Data Found</td></tr>
            )}
          </tbody>
        </Table>
        </Row>
       </Container>
        
      </div>
    );
  }
}


export default TableModule; // Export Class modules
