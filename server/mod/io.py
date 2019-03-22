# Module IO
# Write/Read values to/from process and flush after 

# read from stdin and flush
async def stdinGet(process):
    res = process.stdin.readline().decode().strip()
    process.stdin.flush()
    return res

# read from stdout and flush
async def stdoutGet(process):
    res = process.stdout.readline().decode().strip()
    process.stdout.flush()
    return res

# read from stderr and flush
async def stderrGet(process):
    res = process.stderr.readline().decode().strip()
    process.stderr.flush()
    return res

# write to stdin and flush
async def stdinWrite(process, value):
    process.stdin.write(bytes(value + "\n","UTF-8"))
    process.stdin.flush()
    return True

# write to stderr and flush
async def stderrWrite(process, value):
    process.stderr.write(bytes(value + "\n","UTF-8"))
    process.stderr.flush()
    return True

# write to stdout and flush
async def stdoutWrite(process, value):
    process.stdout.write(bytes(value + "\n","UTF-8"))
    process.stdout.flush()
    return True