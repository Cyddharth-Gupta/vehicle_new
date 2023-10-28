import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import priyanka from "../assets/priyanka.jpg";

export default function MyAvatar(props) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src={priyanka} />
      {props.name}
    </Stack>
  );
}