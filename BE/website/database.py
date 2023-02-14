import psycopg2

def connect_db():
    connection = psycopg2.connect(
        database = "nckh",
        user = "postgres",
        password = "12345",
        host = "localhost",
        port = "5432"
    )
    return connection