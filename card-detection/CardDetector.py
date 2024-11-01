############## Python-OpenCV YuGiOh Card Detector ###############
#
# Author: An Nguyen
# Date: 11/1/24
# Description: Python script to detect and identify YuGiOh Card
#

import numpy as np
import cv2 as cv
import pytesseract

def main():
    print("Starting ...")
    capture = cv.VideoCapture(0)
    if not capture.isOpened():
        print("Cannot open camera")
        exit()
    while True:
        ret, frame = capture.read()
        if not ret:
            print("Can't receive frame (stream end?). Exiting ...")
            break
        detect_card(frame)

        cv.imshow('frame', frame)
        if cv.waitKey(1) == ord('q'):
            break

    capture.release()
    cv.destroyAllWindows()

def detect_card(frame):
    gray_frame = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
    blurred_frame = cv.GaussianBlur(gray_frame, (5,5), 0)
    threshed_frame = cv.threshold(blurred_frame, 0, 255, cv.THRESH_BINARY_INV+cv.THRESH_OTSU)[1]
    contours = cv.findContours(threshed_frame, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)[0]
    cv.drawContours(frame, contours, -1, (0, 255, 0), 2)

    
    # filter contours
    for c in contours:
        x,y,w,h = cv.boundingRect(c)
        areaContour = cv.contourArea(c)
        if areaContour < 100000 and areaContour < 150000:
            continue

        monster_name = gray_frame[y:y+(int(h/8)), x:x+(w-(int(w/5)))]
        monster_name_thresh = cv.threshold(monster_name, 0, 255, cv.THRESH_BINARY+cv.THRESH_OTSU)[1]
        if monster_name_thresh is not None:
            cv.imshow('Monster Name', monster_name_thresh)
            name = pytesseract.image_to_string(monster_name_thresh, lang='eng', config='--psm 6')
            print(name)
        

        
def resize_with_aspect_ratio(image, width=None, height=None, inter=cv.INTER_AREA):
    h, w = image.shape[:2]
    aspect_ratio = w/h
    if width is None:
        new_height = int(height / aspect_ratio)
        resized_image = cv.resize(image, (height, new_height))
    else:
        new_width = int(width * aspect_ratio)
        resized_image = cv.resize(image, (new_width, width))
    return resized_image

if __name__ == '__main__':
    main()