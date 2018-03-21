import socket

host = "localhost"
port = 12800

socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
socket.connect((host, port))
print("Connection with the server established on the port : {}".format(port))

msgToSend = b""
while msgToSend != b"fin":
    msgToSend = input("> ")
    # Peut planter si vous tapez des caractères spéciaux
    msgToSend = msgToSend.encode()
    # On envoie le message
    socket.send(msgToSend)
    #rcvMsg = socket.recv(1024)
    #print(rcvMsg.decode()) # Là encore, peut planter s'il y a des accents

print("Connection close")
socket.close()