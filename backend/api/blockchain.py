import hashlib
import json
from time import time

class BlockChain():
    def __init__(self):
        self.chain = []
        self.current_data = []
        self.create_block(previous_hash = '1', proof=100)

    def create_block(self, proof, previous_hash):
        block = {
            'index': len(self.chain) + 1,
            'timestamp': time(),
            'transaction': self.current_data,
            'proof': proof,
            'previous_hash': previous_hash or self.hash(self.chain[-1]),
        }
        self.current_data = []
        self.chain.append(block)
        return block

    def add_member(self, library_id, user_id):
        self.current_data.append({
            "action": "ADD_MEMBER",
            "library_id": library_id,
            "user_id": user_id,
            "timestamp": time()
        })
    def hash(self, block):
        encoded_block = json.dumps(block, sort_keys=True).encode()
        return hashlib.sha256(encoded_block).hexdigest()

    def get_last_block(self):
        return self.chain[-1]
