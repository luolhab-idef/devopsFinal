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
      setResult('Please select a .wav file');
      setFile(null);
    } else {
      setFile(selectedFile);
      setResult('');
    }
  };

  const handleFileToBase64 = async () => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]); // Extract base64 data only
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // const handlePrediction = async () => {
  //   if (!file) return;

  //   setLoading(true);
  //   try {
  //     if (serviceType === "SVM_service") {
  //       const formData = new FormData();
  //       formData.append("file", file);

  //       const response = await axios.post(
  //         "http://localhost:5000/predict",
  //         formData,
  //         {
  //           headers: { Accept: "application/json" },
  //         }
  //       );

  //       const genre = response.data.genre;
  //       setResult(
  //         genre ? `SVM Model Prediction: ${genre}` : "No genre predicted."
  //       );
  //     } else if (serviceType === "VGG19_service") {
  //       const base64File = await handleFileToBase64();
  //       const formData = new FormData();
  //       formData.append("file", file);
  //       const response = await axios.post(
  //         "http://localhost:5001/vgg19_service",
  //         formData,
  //         { headers: { Accept: "application/json" } }
  //       );

  //       const genre = response.data.genre;
  //       setResult(
  //         genre ? `VGG19 Model Prediction: ${genre}` : "No genre predicted."
  //       );
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     setResult(`Error predicting genre using ${serviceType === 'SVM_service' ? 'SVM' : 'VGG19'} model.`);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


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
          headers: {
            "Content-Type": "multipart/form-data", // Ensure proper Content-Type for file upload
          },
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
    <Card style={{ marginBottom: 20 }}>
      <CardContent>
        <TextField
          type="file"
          accept=".wav"
          onChange={handleFileChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
          style={{ marginBottom: 10 }}
        />
        <Button
          variant="contained"
          color={serviceType === 'SVM_service' ? 'primary' : 'secondary'}
          onClick={handlePrediction}
          disabled={!file || loading}
          style={{ width: '100%' }}
        >
          {loading ? 'Classifying...' : serviceType === 'SVM_service' ? 'SVM Model' : 'VGG19 Model'}
        </Button>
        {result && (
          <Typography variant="body1" style={{ marginTop: 10 }}>
            {result}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default UploadFile;
