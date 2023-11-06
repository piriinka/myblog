import React, { useState } from 'react';
import { FormGroup, Label, Form, Row, Col } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { NotFound } from './NotFound'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Loader } from '../components/Loader';
import { MyAlert } from '../components/MyAlert';
import { uploadAvatar } from '../utility/uploadFile';
import { useConfirm } from "material-ui-confirm";
import { deleteProfile } from '../utility/crudUtility';




export const Profile = ({setAvatar}) => {
  const { user, logoutUser } = useContext(UserContext)
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [loading, setLoading] = useState(false)
  const [photo, setPhoto] = useState(null)
  const [uploaded, setUploaded] = useState(false)
  const confirm=useConfirm()

  if (!user) return (<NotFound />)

  const onSubmit = async (data, e) => {
    e.preventDefault()
    setLoading(true) 
    try {
      const file = data.file[0]
      const photoUrl = await uploadAvatar(file,user.uid)
      //console.log('URL of the file:', photoUrl);
      setAvatar(photoUrl)
      setUploaded(true)
    } catch (err) {
    //  console.log('Error during upload!');
    } finally {
      setLoading(false)
    //  console.log('Successfully uploaded.');
    }
  
    e.target.reset()
  }

  //console.log(user?.uid);

  const handleDelete=async ()=>{
    try{
      await confirm({
        description:'This cannot be undone.',
        confirmationText:'Yes, I want to leave.',
        cancellationText:'Nope, go back.',
        title:'Are you sure you want to delete your account?'
      })
      console.log('delete')
      deleteProfile(user.uid)
      logoutUser()
  }catch(err){
    console.log('megse')
  }
  }

  return (
    <div className='updateProfile'>
<h3 className='update-profile'>✨Profile Settings✨</h3>

      <Form onSubmit={handleSubmit(onSubmit)}>
       

        <FormGroup>
          <Label className='createLabels'>Choose an Avatar:</Label>
          <Row>
          
            <Col md={8}>
              <input type="file" {...register('file', {
                required: true,
                validate: (value) => {
                  const acceptedFormats = ['jpg', 'png', 'jpeg']
                  const fileExtension = value[0]?.name.split('.').pop().toLowerCase()
                  if (!acceptedFormats.includes(fileExtension))
                    return 'Invalid file format.'
                  if (value[0].size > 1 * 1000 * 1024)
                    return 'Maximum file size allowed is 1 MB.'
                  return true
                }
              })}
                className='form-control choosefile'
                onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))}
              /> </Col>
              
              {photo && <img src={photo} alt='postPhoto' className='avatar-thumbnail' />}
            
          </Row>
          <p className='errorMsg'>{errors?.file?.message}</p>

        </FormGroup>
        <input type='submit' className='uploadBtn' value='Upload' />

    
        {loading && <Loader />}
        <Col md={8}>
        {uploaded && <MyAlert text='Woah! Your profile has been updated. 🎉'/>}
        </Col>
      </Form>
      <button className='btn btn-delete' onClick={handleDelete}
      >DELETE MY ACCOUNT
      </button>
    </div>
  );
};