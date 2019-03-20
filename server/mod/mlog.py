import logging
import coloredlogs, logging

coloredlogs.install()
logging.basicConfig(format='%(levelname)s:%(message)s', level=logging.INFO)

def show(msg):
    logging.info(msg)