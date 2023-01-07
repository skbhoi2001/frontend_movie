import React from 'react';
import AdminNav from './AdminNav';
import Styles from '../../../styles/Admin/Actor.module.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const AdminActor = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <AdminNav />
      <div className={Styles.addActor}>
        <div>
          <div>Actor Data</div>
        </div>
        <div onClick={() => handleOpen()}>Add Actor +</div>
      </div>
      <div>Actor Container</div>

      <Modal
        open={open}
        onClose={handleClose}
        // aria-labelledby='modal-modal-title'
        // aria-describedby='modal-modal-description'
        style={{ margin: 'auto' }}
      >
        <div className={Styles.moduleContainer}>
          <input type='file' name='' id='' />
          <TextField
            label='Name'
            id='outlined-basic'
            variant='outlined'
            // onClick={}
          />
          <TextField
            label='About'
            id='outlined-basic'
            variant='outlined'
            // onClick={}
          />
          <FormControl>
            <FormLabel id='demo-radio-buttons-group-label'>Gender</FormLabel>
            <RadioGroup
              aria-labelledby='demo-radio-buttons-group-label'
              defaultValue='female'
              name='radio-buttons-group'
            >
              <FormControlLabel
                value='female'
                control={<Radio />}
                label='Female'
              />
              <FormControlLabel value='male' control={<Radio />} label='Male' />
              <FormControlLabel
                value='other'
                control={<Radio />}
                label='Other'
              />
            </RadioGroup>
          </FormControl>
          <button>Submit</button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminActor;
