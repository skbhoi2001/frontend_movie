import React, { useEffect, useState } from 'react';
import AdminNav from './AdminNav';
import Styles from '../../../styles/Admin/Actor.module.css';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useCookies } from 'react-cookie';
import {
  api_createActor,
  api_deleteActor,
  api_getActors,
  api_updateActor,
} from '../../common/apiOperation';

const AdminActor = () => {
  const [open, setOpen] = React.useState(false);
  const [cookieData, setCookieData] = useCookies();
  const [profile, setProfile] = useState('');
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [gender, setGender] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [alters, setAlters] = useState(false);
  const [actors, setActors] = useState([]);
  const [img1, setImg1] = useState('');
  const [editId, setEditId] = useState();
  console.log('actors', actors);

  useEffect(() => {
    (async () => {
      const actors = await api_getActors();
      setActors(actors?.data?.profiles);
    })();
  }, [alters]);

  const handle1Change = ({ target }) => {
    const { value, files, name } = target;
    if (name === 'avatar') {
      setProfile(files[0]);
    }
  };
  const handleSubmit = async () => {
    const formData = {
      avatar: profile,
      name: name,
      about: about,
      gender: gender,
    };
    const addActor = await api_createActor({ formData, cookieData });
    if (addActor?.data?.statusId == 1) {
      handleClose();
      setAlters(true);
    }
    console.log('addActor', addActor);
  };
  const handleEdit = (imge, namee, aboute, gendere, id) => {
    setImg1(imge);
    setName(namee);
    setAbout(aboute);
    setGender(gendere);
    setEditId(id);
    handleOpen();
  };

  const handleEditSubmit = async () => {
    const formData = {
      avatar: profile,
      name: name,
      about: about,
      gender: gender,
    };
    const updateActor = await api_updateActor({
      formData,
      id: editId,
      cookieData,
    });
    if (updateActor?.data?.statusId == 1) {
      setAlters(true);
      handleClose();
    }
  };
  const handleDelete = async ({ id }) => {
    const delAct = await api_deleteActor({ id, cookieData });
    if (delAct?.data?.statusId == 1) {
      setAlters(true);
    }
  };

  return (
    <div>
      <AdminNav />

      <div>
        <div className={Styles.addActor}>
          <div className={Styles.addActorData}>Actor Data</div>
          <button
            onClick={handleOpen}
            className={`globalButton ${Styles.addActorBtn}`}
          >
            Add New Actor
          </button>
        </div>
        <div className={Styles.cont1}>
          {actors?.map((item) => {
            return (
              <div className={Styles.actorContainer} key={item?.id}>
                <img
                  style={{ height: '100px', width: '100px' }}
                  src={item?.avatar}
                  alt=''
                />
                <div className={Styles.titleArea}>
                  <div className={Styles.nameAbout}>
                    <div>
                      <b>Name:</b>
                      {item?.name}
                    </div>
                    <div>
                      <b>Gender:</b>
                      {item?.gender}
                    </div>
                    <div>
                      <b>About:</b>
                      {item?.about}
                    </div>
                  </div>
                  <div className={Styles.buttonArea}>
                    <button
                      onClick={() =>
                        handleEdit(
                          item?.avatar,
                          item?.name,
                          item?.about,
                          item?.gender,
                          item?.id
                        )
                      }
                      className={`globalButton ${Styles.addActorBtn1}`}
                    >
                      EDIT
                    </button>
                    <button
                      onClick={() => handleDelete({ id: item?.id })}
                      className={`globalButton ${Styles.addActorBtn1}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        // aria-labelledby='modal-modal-title'
        // aria-describedby='modal-modal-description'
        style={{ margin: 'auto' }}
      >
        <div className={Styles.moduleContainer}>
          <div className={`fontType0 ${Styles.textActDet}`}>
            Enter Actor Details
          </div>
          {/* <input
            type='file'
            name='avatar'
            id=''
            accept='image/jpg, image/jpeg, image/png'
            onChange={handle1Change}
          /> */}
          <div className={`file-input ${Styles.uploadImage}`}>
            {img1 && (
              <img
                style={{ height: '100px', width: '100px' }}
                src={img1}
                alt=''
              />
            )}
            <input
              type='file'
              name='avatar'
              id='file-input'
              accept='image/jpg, image/jpeg, image/png'
              onChange={handle1Change}
              className='file-input__input'
            />
            <label className='file-input__label' for='file-input'>
              <svg
                aria-hidden='true'
                focusable='false'
                data-prefix='fas'
                data-icon='upload'
                className='svg-inline--fa fa-upload fa-w-16'
                role='img'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 512 512'
              >
                <path
                  fill='currentColor'
                  d='M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z'
                ></path>
              </svg>
              <span>{img1 ? 'Change Image' : 'Upload file'}</span>
            </label>
            <div>{profile.name}</div>
          </div>
          <TextField
            label='Name'
            id='outlined-basic'
            variant='outlined'
            onChange={(e) => setName(e.target.value)}
            style={{ width: '50%' }}
            value={name}
          />
          <TextField
            label='About'
            id='outlined-basic'
            variant='outlined'
            onChange={(e) => setAbout(e.target.value)}
            style={{ width: '50%' }}
            value={about}
          />
          <div className={Styles.radioCont}>
            <FormControl>
              <FormLabel id='demo-radio-buttons-group-label'>Gender</FormLabel>
              <RadioGroup
                aria-labelledby='demo-radio-buttons-group-label'
                defaultValue='other'
                name='radio-buttons-group'
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel
                  value='other'
                  control={<Radio />}
                  label='Other'
                  onChange={(e) => setGender(e.target.value)}
                />
                <FormControlLabel
                  value='female'
                  control={<Radio />}
                  label='Female'
                />
                <FormControlLabel
                  value='male'
                  onChange={(e) => setGender(e.target.value)}
                  control={<Radio />}
                  label='Male'
                />
              </RadioGroup>
            </FormControl>
          </div>
          <button
            style={{ width: '50%' }}
            className={`globalButton ${Styles.submitButton}`}
            onClick={() => (editId ? handleEditSubmit() : handleSubmit())}
          >
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminActor;
