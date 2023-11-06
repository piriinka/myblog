import React, { useEffect, useState } from 'react';
import { FormGroup, Label, Form, Row, Col } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { NotFound } from './NotFound'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Loader } from '../components/Loader';
import { uploadFile } from '../utility/uploadFile';
import { addPost, editPost, readPost } from '../utility/crudUtility';
import { MyAlert } from '../components/MyAlert';
import { CategContext } from '../context/CategContext';
import { Story } from '../components/Story';
import { useParams } from 'react-router-dom';


export const AddEdditPost = () => {
  const { user } = useContext(UserContext)
  const {categories}=useContext(CategContext)
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [loading, setLoading] = useState(false)
  const [photo, setPhoto] = useState(null)
  const [uploaded, setUploaded] = useState(false)
  const [story,setStory] = useState('')
  const param=useParams()
  const [post, setPost] = useState(null)

  useEffect(()=>{
    if(param?.id)
    readPost(param.id,setPost)
  },[param?.id])

  useEffect(()=>{
    if(post && param?.id){
      setValue('title',post.title)
      setValue('category',post.category)
      setPhoto(post.photoUrl)
    }
  },[post,param?.id])

 // console.log(post)

  if (!user) return (<NotFound />)

  const onSubmit = async (data, e) => {
    e.preventDefault()
    setLoading(true) 
    if(param.id){
    try{
      const newData={...data}
      editPost(param.id,{...newData,description:story})
      setUploaded(true)
    }catch(err){
      console.log('hiba update eseten:',err)
    }finally{
      setLoading(false)
    }
    }else{
    try {
      const file = data.file[0]
      const photoUrl = await uploadFile(file)
      console.log('URL of the file:', photoUrl);
      const newData={...data}
      delete newData.file
      await addPost({...newData,photoUrl,author:user.displayName, userId:user.uid,description:story,likes:[],likesCount:0})
      setUploaded(true)
    } catch (err) {
      console.log('Error during upload!');
    } finally {
      setLoading(false)
    //  console.log('Successfully uploaded.');
    }
  }
    e.target.reset()
  }

  //console.log(errors);

  return (
    <div className='createBlog'>
<h3>{param?.id ? '✨ Update blog ✨' : '✨ Create blog ✨'}</h3>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label className='createLabels'>Title</Label>
              <input type="text" {...register('title', { required: true })} className='form-control titleInput' />
              {errors.title && <p className='errorMsg' >Title is required.</p>}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label className='createLabels'>Blog category</Label>
              <select {...register('category', {
                required: true,
                validate: (value => {
                  if (value == 0) return 'You must select a category.'
                })
              })}
                className='form-select createLabels'>
                <option value='0'>Select category!</option>
                {categories.map((ctg) => (
                  <option key={ctg} value={ctg}>{ctg}</option>
                ))}
              </select>
              <p className='errorMsg'>{errors?.category?.message}</p>
            </FormGroup>
          </Col>
        </Row>

        <FormGroup>
          <Label className='createLabels'>Description</Label>
          <Story story={post?.description} setStory={setStory}/>
          {errors.description && <p className='errorMsg'>Description is required.</p>}
        </FormGroup>

        <FormGroup>
          <Label className='createLabels'>Attachment:</Label>
          <Row>
            {!param.id && 
            <Col md={10}>
              <input type="file" {...register('file', {
                required: true,
                validate: (value) => {
                  const acceptedFormats = ['jpg', 'png', 'jpeg', 'gif']
                  const fileExtension = value[0]?.name.split('.').pop().toLowerCase()
                  if (!acceptedFormats.includes(fileExtension))
                    return 'Invalid file format.'
                  if (value[0].size > 1 * 1000 * 1024)
                    return 'Maximum file size allowed is 1 MB.'
                  return true
                }
              })}
                className='form-control'
                onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))}
              /> </Col>}
            <Col md={2}> 
              {photo && <img src={photo} alt='postPhoto' className='img-thumbnail' />}
            </Col>
          </Row>
          <p className='errorMsg'>{errors?.file?.message}</p>

        </FormGroup>
        <Row>
        <Col md={2}>
        <input type='submit' className='createBtn' value='Submit' />
        </Col>
        <Col md={10}>

        {uploaded && <MyAlert text='Yay! Your post has been submitted. 🎉'/>}
        </Col>
        </Row>
        {loading && <Loader />}

      </Form>
    </div>
  );
};