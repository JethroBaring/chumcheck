# Use the official Python image from the Docker Hub
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory
WORKDIR /app

# Install system dependencies required for WeasyPrint
RUN apt-get update && \
    apt-get install -y \
    libpango1.0-0 \
    libgdk-pixbuf2.0-0 \
    libgirepository-1.0-1 \
    libcairo2 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file
COPY requirements.txt /app/

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire application code
COPY . /app/

# Expose the port the app runs on
EXPOSE 8000

# Command to run your Django application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]