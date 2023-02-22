import React, { useState } from 'react'
import Papa from "papaparse";
import {Table, Button, Segment, Form } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';

import Swal from 'sweetalert2';


const Upload = () => {
    const navigate = useNavigate();
    const [parsedData, setParsedData] = useState([]);
    const [tableRows, setTableRows] = useState([]);
    const [values, setValues] = useState([]);
    const [jsonData, setJsonData] = useState([]);



    const changeHandler = (event) => {
       
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                const rowsArray = [];
                const valuesArray = [];
                console.log(results.data);
                setJsonData(results.data);
                
                results.data.map((d) => {
                    rowsArray.push(Object.keys(d));
                    valuesArray.push(Object.values(d));
                    return d
                });

                setParsedData(results.data);
                setTableRows(rowsArray[0]);
                setValues(valuesArray);
            },
        });
    };

    const hasDuplicate = (arrayObj, colName) => {
        var hash = Object.create(null);
        return arrayObj.some((arr) => {
            return arr[colName] && (hash[arr[colName]] || !(hash[arr[colName]] = true));
        });
    };

    const sendDataToAPI = () => {
        if (parsedData.length > 0) {
            var isDuplicate = hasDuplicate(parsedData, "learnerId");
            if (!isDuplicate) {
                axios.post('http://localhost:4000/api/v1/learner/upload', parsedData)
                    .then((response) => {
                        if (response.data.status === 'Failed') {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Learner Id already exist..! Please reload the website',
                                
                              })
                              window.location.reload();
                        }
                        else if (response.data.status === 'OK') {
                            Swal.fire({
                                title: 'Csv Added Successfully..!',
                                showDenyButton: false,
                                
                                confirmButtonText: 'Return to home',
                                
                              }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                  Swal.fire('Saved!', '', 'success')
                                  navigate('/home');
                                  
                                } else if (result.isDenied) {
                                  
                                  
                                }
                              })
                        }
                    })
                    .catch(function (error) {
                        console.log(error.toJSON());
                    });
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                  })
            }
        }
        else {
            alert('No data found!');
        }
    }
    return (
        <div>
            <div>
                <Navbar/>
                
                <div className="container">
                    
                    <div className="place-holder">

                      
                        <Segment style={{border:"none"}}>
                            <Form style={{border:"none",width:"900px",backgroundColor:"lightgray",height:"330px",padding:"20px"}}>
                                <Form.Field>
                                    <label>Select CSV File</label>
                                    <input
                                        type="file"
                                        name="file"
                                        onChange={changeHandler}
                                        accept=".csv"
                                        style={{ display: "block", margin: "10px auto",width:"400px" }} />
                                </Form.Field>

                                <Table celled>
                                    <Table.Header >
                                        <Table.Row >
                                            {tableRows.map((rows, index) => {
                                                return (
                                                    <Table.HeaderCell style={{backgroundColor:"#581845", color:"#ffffff"}}>{rows}</Table.HeaderCell>)
                                            })}
                                        </Table.Row>

                                    </Table.Header>

                                    <Table.Body>
                                        {values.map((value, index) => {
                                            return (
                                                <Table.Row>
                                                    {value.map((val, i) => {
                                                        return <Table.Cell>{val}</Table.Cell>
                                                    })}

                                                </Table.Row>
                                            )
                                        })}
                                    </Table.Body>
                                </Table>

                                <Button size='mini' color='grey' type='submit' onClick={sendDataToAPI} style={{backgroundColor:"#FFC300", color:"#ffffff", fontSize:15, borderColor:"#FF0000"}} >Submit</Button>
                                <Link to='/home' >
                                <Button size='mini'  style={{backgroundColor:"#FF0000", color:"#ffffff", fontSize:15, borderColor:"#FFC300"}}>
                                    Cancel
                                </Button>
                                </Link>
                                
                                <Form.Field>
                                
                                <a href="https://drive.google.com/file/d/1bVqcbyPZsh6CGmvbbGmhk-cdup6wvfa0/view?usp=sharing" download style={{ color:"red"}}>Click Here to Download Sample csv</a>
                                </Form.Field>
                            </Form>
                        </Segment>
                    </div>
                </div>
            </div>
            
            </div>
    )
}

export default Upload