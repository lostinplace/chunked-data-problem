import json

class ChunkInterpreter:
    json_object_terminator = '}'

    def __init__(self):
        self._cache = ''

    def interpret_chunk(self, chunk):
        potential_endings = chunk.split(ChunkInterpreter.json_object_terminator)
        last_index = len(potential_endings) - 1
        for i, val in enumerate(potential_endings):
            is_last_item = (i == last_index)
            self._cache += (potential_endings[i] + ('' if is_last_item else '}'))
            try:
                temp_object = json.loads(self._cache)
                object_string = json.dumps(temp_object, ensure_ascii=False)
                object_string = object_string.replace('\n', '')
                self._cache = ''
                yield object_string
            except ValueError:
                pass