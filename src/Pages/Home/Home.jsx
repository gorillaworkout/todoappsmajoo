import React, { useState,useEffect } from 'react';
import './home.css'
import logo  from './../../Assets/gorillalogo.png'
import {AiFillCheckCircle,AiOutlineEdit,AiOutlineDelete} from 'react-icons/ai'
import {BsThreeDots} from 'react-icons/bs'
import {RiErrorWarningLine} from 'react-icons/ri'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button as ButtonSemantic, Popup,Grid } from 'semantic-ui-react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import {useDispatch,useSelector} from 'react-redux'
import Task from '../../Components/Task';
import TaskName from '../../Components/TaskName';
import SideHeader from '../../Components/SideHeader/SideHeader';
import Header from '../../Components/SideHeader/Header';
import {FullPageLoading} from '../../Components/Loading/Loading'
export default function Home(){

    const dispatch = useDispatch()
    const Product = useSelector(state=>state.Product)
    // console.log(Product)
      // NEW
      const [allData,setAllData]=useState(Product.allProduct)
      const [onProgressList,setOnProgressList]=useState(Product.allOnProgress)
      const [onSuccessList,setOnSuccessList]=useState(Product.allOnSuccess)
      // END NEW
    


    const [modalTambah,setModalTambah]=useState(false)
    const [editTask,setEditTask]=useState(false)
    const [deleteTask,setDeleteTask]=useState(false)


    const [indexTask,setIndexTask]=useState(0)
    const [nameTask,setNameTask]=useState('')
    const [progressNum,setProgressNum]=useState(0)

    const [progressBar,setProgressBar]=useState(90)

    const [loadingFetch,setLoadingFetch]=useState(true)

    useEffect(()=>{
        if(Product.isLoadingProduct === !true){
            setAllData(Product.allProduct)
            setOnProgressList(Product.allOnProgress)
            setOnSuccessList(Product.allOnSuccess) 
            setLoadingFetch(false) 
        }
        // checkingProduct()
     
    },[Product.allData, Product.allOnProgress, Product.allOnSuccess, Product.allProduct, Product.isLoadingProduct, allData, loadingFetch, onProgressList, onSuccessList])
    
    const [editNameTask,setEditNameTask]=useState('')
    const [editProgress,setEditProgress]=useState(0)
    const [indexEdit,setIndexEdit]=useState(0)
    const [indexDelete,setIndexDelete]=useState(0)

    const [description,setDescription] = useState('')
    const [editDescription,setEditDescription]=useState('')


    const onSave=()=>{
        console.log('save btn')
        var dataToSaved = allData
        var status = progressNum
        var find_id = allData.length + 1
        if ( progressNum === '100' ){
            status = 1
        }else {
            status = 0
        }
        var descriptionProduct = 'testing'
        var date = new Date()
        var time = date.toLocaleTimeString();
        var newDate = `${(new Date()).toISOString().split('T')[0]} ${time}`
        console.log(newDate) 
        console.log(time)
        const obj = {
            "id":find_id,
            "title":nameTask,
            "status":status,
            "description":descriptionProduct,
            "createdAt":newDate
        }
        dataToSaved.push(obj)
        dispatch({type:'ADDPRODUCT',allProduct:dataToSaved})
        setModalTambah(false)
    } 
    const onSaveEdit=()=>{
        console.log('active')
        console.log('active')
        var status = progressNum
        if ( editProgress === '100' ){
            status = 1
        }else {
            status = 0
        }
        var date = new Date()
        var time = date.toLocaleTimeString();
        var newDate = `${(new Date()).toISOString().split('T')[0]} ${time}`
        const obj = {
            "id":indexEdit,
            "title":editNameTask,
            "status":status,
            "description":description,
            "createdAt":newDate
        }
        var dataToSaved = allData

        var objIndex = allData.findIndex((obj => obj.id === indexEdit))
        allData[objIndex].title = editNameTask
        allData[objIndex].status = status
        allData[objIndex].description = description
        allData[objIndex].createdAt = newDate
        dispatch({type:'UPDATEPRODUCT',allProduct:dataToSaved})
        setEditTask(false)
    }

    const onDescription=(description)=>{
        setDescription(description)
    }

    const createTask=(id)=>{
        console.log(id,' ini id 158')
        setModalTambah(true)
        setIndexTask(id)
    }
    const editTaskFunc=(id,index,val)=>{
        setIndexEdit(index)
        setIndexTask(id)
        setEditTask(true)
        // setEditDescription()
        setEditNameTask(val.title)
        setEditProgress(val.status)
        setEditDescription(val.description)
        console.log(val)
    }
    const deleteTaskFunc=(id,index)=>{
        console.log(id)
        setIndexDelete(index)
        setIndexTask(id)
        setDeleteTask(true)
    }

    const onDeleteEdit=()=>{
        var dataToSaved = allData
        var objIndex = allData.findIndex((obj => obj.id === indexDelete))
        dataToSaved.splice(objIndex,1)
        setAllData(dataToSaved)
        setDeleteTask(false)

    }

    
    const toggle=()=>setModalTambah(false)
    const toggleEdit=()=>setEditTask(false)
    const toggleDelete=()=>setDeleteTask(false)

 

    const renderItem=()=>{
        const dataRender = allData
        dataRender.sort(function(a, b) {
            var c = new Date(a.createdAt);
            var d = new Date(b.createdAt);
            return c-d;
        }); 
            return dataRender.map((val,index)=>{
                if(val.status === 0){
                    return (
                        <div key={index} className="main-task">
                            <p id="name-item">{val.title}</p>
                            <div className="task-option">
                                <div className="option-left">
                                    <div className="prog-bar">
                                    {
                                            val.progress === 1?
                                            <>
                                            <ProgressBar now={val.status}  variant="success" />
                                            <AiFillCheckCircle id="icon"/>
                                            
                                            </>
                                            :
                                            <>

                                            <ProgressBar now={val.status}  />
                                            <p>{val.status}%</p>
                                            
                                            </>
                                        }
                                    </div>
                                </div>
                                    
                                
                                <Popup
                                    trigger={
                                    <ButtonSemantic>
                                        <BsThreeDots id="icon-2"/>
                                    </ButtonSemantic>
                                    
                                    }
                                    flowing hoverable>
                                    <Grid centered divided columns={1} className="grid-modal">
                                        <Grid.Row className="grid-row-mod">
                                            <div className="row-mod-1">
                                                <AiOutlineEdit className="icon-mod"/>
                                            </div>
                                            <div className="row-mod-2" onClick={()=>editTaskFunc(2,val.id,val)}>
                                                <p>Edit</p>                                       
                                            </div>
                                        </Grid.Row>
                                        <Grid.Row className="grid-row-mod">
                                            <div className="row-mod-1">
                                                <AiOutlineDelete className="icon-mod"/>
                                            </div>
                                            <div className="row-mod-2" onClick={()=>deleteTaskFunc(2,val.id)}>
                                                <p>Delete</p>
                                            </div>
                                        </Grid.Row>
                                    </Grid>
                                </Popup>        
                            </div>
                            <p>{val.description}</p>
                        </div>
                    )
                }else {
                    <>
                    </>
                }
        })

    }

    const renderItem2=()=>{
        const dataRender = allData
        dataRender.sort(function(a, b) {
            var c = new Date(a.createdAt);
            var d = new Date(b.createdAt);
            return d-c;
        });
            return dataRender.map((val,index)=>{
                if(val.status === 1){
                    // console.log(val)
                    return (
                        <div key={index} className="main-task">
                            <p id="name-item">{val.title}</p>
                            <div className="task-option">
                                <div className="option-left">
                                    <div className="prog-bar">
                                    {
                                            val.progress === 1?
                                            <>
                                            <ProgressBar now={val.status}  variant="success" />
                                            <AiFillCheckCircle id="icon"/>
                                            </>
                                            :
                                            <>

                                            <ProgressBar now={100}  />
                                            <p>Success</p>
                                            </>
                                        }
                                    </div>
                                </div>
                                
                                <Popup
                                    trigger={
                                    <ButtonSemantic>
                                        <BsThreeDots id="icon-2"/>
                                    </ButtonSemantic>
                                    
                                    }
                                    flowing hoverable>
                                    <Grid centered divided columns={1} className="grid-modal">
                                        <Grid.Row className="grid-row-mod">
                                            <div className="row-mod-1">
                                                <AiOutlineEdit className="icon-mod"/>
                                            </div>
                                            <div className="row-mod-2" onClick={()=>editTaskFunc(2,val.id,val)}>
                                                <p>Edit</p>                                       
                                            </div>
                                        </Grid.Row>
                                    </Grid>
                                </Popup>        
                            </div>
                            <p>{val.description}</p>
                        </div>
                    )
                }else {
                    <>
                    </>
                }
        })
    }

 

  if(loadingFetch){
    // console.log('masih stuck di app page baru jalan')
    return (
      <div className='d-flex justify-content-center align-items-center' style={{height:"100vh", width:"100vw"}}>
          {FullPageLoading(loadingFetch,100,'#0095DA')}
      </div>
    )
  }
    return (
        <>
        {/* DELETE TASK */}
        <Modal isOpen={deleteTask} toggle={toggleDelete} id="modal-box-delete">
            <ModalHeader toggle={toggleDelete} id="delete-task">
                <RiErrorWarningLine id="icon-warning"/>
                <p>Delete Task</p>
            </ModalHeader>
            <ModalBody id="delete-body">
               <p>Are you sure want to delete this task?
                </p>
            </ModalBody>
            <ModalFooter id="footer-delete">
                <Button color="primary" onClick={toggleDelete}>Cancel</Button>
                <Button color="primary" onClick={onDeleteEdit}>Delete Task</Button>
            </ModalFooter>
         </Modal>
        {/* DELETE TASK END */}

        {/* EDIT TASK */}
        <Modal isOpen={editTask} toggle={toggleEdit} id="modal-box">
            <ModalHeader toggle={toggleEdit} id="create-task">
                <p>Edit Task</p>
            </ModalHeader>
            <ModalBody>
                <TaskName arr={{
                    taskName:'Task Name',
                    typeInput:'text',
                    onClick:(e)=>setEditNameTask(e.target.value),
                    placeholder:'Example: Build rocket to mars',
                    className:'input-modal-task',
                    defaultValue:editNameTask
                    
                }}/>
                 <TaskName arr={{
                    taskName:'Description',
                    typeInput:'text',
                    onClick:(e)=>onDescription(e.target.value),
                    placeholder:'Example: Build Your Own Brain',
                    className:'input-modal-task',
                    defaultValue:editDescription
                }}/>
                 <TaskName arr={{
                    taskName:'Progress',
                    typeInput:'number',
                    onClick:(e)=>setEditProgress(e.target.value),
                    placeholder:'Example: Build Your Own Brain',
                    className:'input-modal-progress',
                    defaultValue:editProgress
                }}/>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggleEdit}>Cancel</Button>
                <Button color="primary" onClick={onSaveEdit}>Save Task</Button>
            </ModalFooter>
        </Modal>
        {/* EDIT TASK END*/}

        {/* TAMBAH TASK */}
        <Modal isOpen={modalTambah} toggle={toggle} id="modal-box">
            <ModalHeader toggle={toggle} id="create-task">
                <p>Create Task</p>
            </ModalHeader>
            <ModalBody>
                <TaskName arr={{
                    taskName:'Task Name',
                    typeInput:'text',
                    onClick:(e)=>setNameTask(e.target.value),
                    placeholder:'Example: Build rocket to mars',
                    className:'input-modal-task'
                }}/>
                 <TaskName arr={{
                    taskName:'Description',
                    typeInput:'text',
                    onClick:(e)=>onDescription(e.target.value),
                    placeholder:'Example: Build Your Own BRAIN',
                    className:'input-modal-task'
                }}/>
                 <TaskName arr={{
                    taskName:'Description',
                    typeInput:'number',
                    onClick:(e)=>setProgressNum(e.target.value),
                    placeholder:'0%',
                    className:'input-modal-progress'
                }}/>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggle}>Cancel</Button>
                <Button color="primary" onClick={onSave}>Save Task</Button>
            </ModalFooter>
        </Modal>
        {/* TAMBAH TASK END */}


        {/* batas modals */}
            <div className="box-home">
                <SideHeader arr={{
                    img:logo
                }}/>
                <div className="home-main">
                    <Header arr={{
                        judul:'PRODUCT ROADMAP'
                    }}/>
                    <div className="main-2">
                        <Task arr={{
                            judul:'Group Task 1',
                            status:'ON PROGRESS',
                            onClick:createTask,
                            params:1,
                            render:renderItem()

                        }}/>
                          <Task arr={{
                            judul:'Group Task 2',
                            status:'Success',
                            onClick:createTask,
                            params:1,
                            render:renderItem2()

                        }}/>
                    </div>
                </div>

            </div>

        </>
    )
}