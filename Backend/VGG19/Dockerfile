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

RUN mkdir -p models
COPY ./models/trained_model.h5 ./models/
# Copy the rest of your application code
COPY . .

EXPOSE 5001

# Set the command to run your application
CMD ["python", "vgg19_service.py"]
