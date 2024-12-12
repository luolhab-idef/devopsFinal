import React, { useState } from 'react';
import { Button, TextField, Typography, Card, CardContent } from '@mui/material';
import axios from 'axios';

function UploadFile({ serviceType }) {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile && selectedFile.type !== 'audio/wav') {
      setResult('Please select a valid .wav file');
      setFile(null);
    } else {
      setFile(selectedFile);
      setResult('');
    }
  };

  const handlePrediction = async () => {
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        serviceType === "SVM_service"
          ? "http://localhost:5000/predict"
          : "http://localhost:5001/vgg19_service",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const genre = response.data.predicted_genre || response.data.genre;
      setResult(
        genre
          ? `${serviceType === 'SVM_service' ? 'SVM' : 'VGG19'} Model Prediction: ${genre}`
          : "No genre predicted."
      );
    } catch (error) {
      console.error("Error:", error);
      setResult(`Error predicting genre using ${serviceType === 'SVM_service' ? 'SVM' : 'VGG19'} model.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      background: 'linear-gradient(to right, #4facfe, #00f2fe)', 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      fontFamily: "'Poppins', sans-serif" 
    }}>
      <Card 
        style={{ 
          maxWidth: 500, 
          padding: 20, 
          borderRadius: 15, 
          boxShadow: '0 10px 20px rgba(0,0,0,0.2)' 
        }}
      >
        <CardContent>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            <div style={{ fontSize: 50, color: '#ff5722', textAlign: 'center' }}>
              🎵
            </div>
            <Typography 
              variant="h4" 
              style={{ marginLeft: 10, fontWeight: 600, color: '#333' }}
            >
              {serviceType === 'SVM_service' ? 'SVM Music Classifier' : 'VGG19 Music Classifier'}
            </Typography>
          </div>
          <TextField
            type="file"
            accept=".wav"
            onChange={handleFileChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            style={{ marginBottom: 20 }}
          />
          <Button
            variant="contained"
            style={{ 
              background: serviceType === 'SVM_service' ? '#ff5722' : '#4caf50', 
              color: '#fff', 
              padding: '10px 20px', 
              fontWeight: 'bold' 
            }}
            onClick={handlePrediction}
            disabled={!file || loading}
            fullWidth
          >
            {loading ? 'Processing...' : 'Classify Audio'}
          </Button>
          {result && (
            <Typography
              variant="body1"
              style={{
                marginTop: 20,
                color: result.startsWith('Error') ? '#d32f2f' : '#388e3c',
                textAlign: 'center',
                fontWeight: 500,
                fontSize: '1.2rem'
              }}
            >
              {result}
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default UploadFile;
