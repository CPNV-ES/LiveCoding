# Logger module
# Use logging and coloredlogs to have very nice messages

import coloredlogs, logging

coloredlogs.install()
logging.basicConfig(format='%(levelname)s:%(message)s', level=logging.INFO)

def show(msg):
    logging.info(msg)