import numpy as np
import cv2 as cv

monster_face_up = cv.imread('/Users/an/workspace/smart-duel-blade/card-detection/samples/monster_face_up_noisy.jpg')


# monster_face_up = cv.resize(monster_face_up, (0, 0), None, .25, .25)
monster_face_up_gray = cv.cvtColor(monster_face_up, cv.COLOR_BGR2GRAY)
blurred = cv.medianBlur(monster_face_up_gray, 9)
ret, threshed = cv.threshold(blurred, 0, 255, cv.THRESH_BINARY+cv.THRESH_OTSU)
# threshed = cv.erode(threshed, np.ones((21,21)))
threshed = cv.morphologyEx(threshed, cv.MORPH_OPEN, np.ones((3,3), np.uint8))

contours, hierarchy = cv.findContours(threshed, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)

# filter contours
for i, c in enumerate(contours):
    areaContour = cv.contourArea(c)
    if areaContour < 90000 and areaContour < 100000:
        continue
    cv.drawContours(monster_face_up, contours, i, (0, 255, 0), 5)

threshed_monster_face_up_gray_3_channel = cv.cvtColor(threshed, cv.COLOR_GRAY2BGR)
blurred_3_channel = cv.cvtColor(blurred, cv.COLOR_GRAY2BGR)

numpy_horizontal = np.hstack((monster_face_up, threshed_monster_face_up_gray_3_channel, blurred_3_channel))
horizontal_concat = np.concatenate((monster_face_up, threshed_monster_face_up_gray_3_channel, blurred_3_channel), axis=1)
cv.imshow('Numpy Horizontal Concat', horizontal_concat)

k = cv.waitKey(0)
if (k == 'q'):
    cv.destroyAllWindows()

cv.destroyAllWindows()

