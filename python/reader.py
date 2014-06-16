from chunkInterpreter import ChunkInterpreter
from http import client

connection = client.HTTPConnection('localhost:8001')
connection.request('GET', '')
response = connection.getresponse()

interpreter = ChunkInterpreter()

for chunk in response:
    response_text = chunk.decode('utf-8')
    for result in interpreter.interpret_chunk(response_text):
        print(result)