FROM python:3.11-slim

ARG PORT=5000
ENV PORT=${PORT}

WORKDIR /app

RUN pip3 install flask
RUN pip3 install flask_cors

COPY . .

EXPOSE ${PORT}

CMD ["/bin/bash", "-c", "python3 -m flask run --host=0.0.0.0 --port=$PORT"]
