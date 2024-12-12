import pytest
from svm_service import app
import base64
import io
from unittest.mock import patch

# Mock data for VGG19 service
mock_audio_data_vgg = base64.b64encode(b"fake_wav_data").decode('utf-8')
mock_prediction_vgg = [0.1, 0.2, 0.6, 0.1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]  # Example predictions

# Mock data for SVM service
mock_audio_file_svm = io.BytesIO(b"fake_audio_data")
mock_prediction_svm = 3  # Example predicted index

# Test VGG19 service
# def test_vgg19_service_prediction(mocker):
#     client = app.test_client()

#     # Mock the model prediction
#     mocker.patch('tensorflow.keras.models.Model.predict', return_value=[mock_prediction_vgg])

#     response = client.post('/vgg19_service', json={"wav_music": mock_audio_data_vgg})
#     assert response.status_code == 200
#     data = response.get_json()
#     assert data['genre'] == "classical"  # Expected genre from mock_prediction_vgg

# def test_vgg19_service_invalid_input():
#     client = app.test_client()

#     # Send invalid input
#     response = client.post('/vgg19_service', json={"wav_music": "invalid_base64"})
#     assert response.status_code == 500
#     data = response.get_json()
#     assert 'error' in data

# Test SVM service
def test_svm_service_prediction(mocker):
    client = app.test_client()

    # Mock the model prediction
    mocker.patch('joblib.load', return_value=lambda x: mock_prediction_svm)

    # Mock the feature extraction function
    mocker.patch('app.extract_features', return_value=[0.1] * 237)

    with patch('werkzeug.datastructures.FileStorage.save') as mock_save:
        mock_save.return_value = None
        response = client.post('/predict', data={'file': (mock_audio_file_svm, r'uploads\hiphop.00001.wav')})

    assert response.status_code == 200
    data = response.get_json()
    assert data['genre'] == "hiphop"  # Expected genre from mock_prediction_svm index

def test_svm_service_invalid_file(mocker):
    client = app.test_client()

    # Mock error when saving file or processing
    with patch('werkzeug.datastructures.FileStorage.save', side_effect=Exception("File error")):
        response = client.post('/predict', data={})

    assert response.status_code == 500
    data = response.get_json()
    assert 'error' in data  # Ensure error message is returned
