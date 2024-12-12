FROM python:3.12.2-slim

# Set working directory
WORKDIR /app

# Install build tools and dependencies for packages
RUN apt-get update && \
    apt-get install -y gcc libc-dev && \
    rm -rf /var/lib/apt/lists/*

# Copy requirements.txt and install dependencies
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install pytest-html
# Ensure the models directory exists and copy the model file there
RUN mkdir -p models
COPY ./models/best_svm_music_genre_model.pkl ./models/

# Copy the rest of your application code
COPY svm_service.py .

EXPOSE 5000

# Set the command to run your application
CMD ["python", "svm_service.py"]
