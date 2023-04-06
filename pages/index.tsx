import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../src/Link';
import { Tab, Table, Tabs } from '@mui/material';
import MainBox from '../src/MainBox';


export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Web3-Test Dapp : USDC holders and Transfer history
        </Typography>
        <Link href="/" color="secondary">
          Go to the github source
        </Link>
      </Box>
      <MainBox />
    </Container>
  );
}
