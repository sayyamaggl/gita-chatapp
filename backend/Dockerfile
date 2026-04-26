FROM python:3.12-slim

WORKDIR /app

RUN apt-get update && apt-get install -y libpq-dev gcc

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Run the seeding script automatically, then start the FastAPI application
# Set PYTHONPATH so that imports like `app.database` work both in seed_db and inside the app
ENV PYTHONPATH=/app

CMD sh -c "python seed_db.py && uvicorn app.main:app --host 0.0.0.0 --port 8005"
