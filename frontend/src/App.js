import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import UploadFile from './components/UploadFile';

function App() {
  return (
    <div className="App" style={{ margin: '50px auto', maxWidth: 400 }}>
      <Card style={{ marginBottom: 20 }}>
        <CardContent>
          <Typography variant="h5" component="div" style={{ textAlign: 'center' }}>
            Music Genre Classification
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{ textAlign: 'center', marginBottom: 20 }}>
            Upload your .wav file to classify its genre using Machine Learning!
          </Typography>
        </CardContent>
      </Card>
      {/* Box 1: SVM Model */}
      <UploadFile serviceType="SVM_service" />
      {/* Box 2: VGG19 Model */}
      <UploadFile serviceType="VGG19_service" />
    </div>
  );
}

export default App;
