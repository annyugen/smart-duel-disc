import cv2 as cv

img = cv.imread('/Users/an/workspace/smart-duel-blade/card-detection/samples/monster_face_up_noisy.jpg')
img_gray = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
blurred = cv.medianBlur(img_gray, 9)
ret, threshed = cv.threshold(blurred, 0, 255, cv.THRESH_BINARY+cv.THRESH_OTSU)
threshed = cv.morphologyEx(threshed, cv.MORPH_OPEN, np.ones((3,3), np.uint8))
contours, hierarchy = cv.findContours(threshed, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)

# filter contours
for c in contours:
    areaContour = cv.contourArea(c)
    if areaContour < 200000 and areaContour < 200000: # This works well when testing with static jpg
        continue
    x,y,w,h = cv.boundingRect(c)

    # cv.rectangle(monster_face_up, (x,y), (x+w,y+h), (0,255,0), 2)
    ROI = img_gray[y:y+h, x:x+w]
    monster_name = img_gray[y+50:y+(int(h/8)), x+100:x+(w-(int(w/5)))]
    monster_name_thresh = cv.threshold(monster_name, 0, 255, cv.THRESH_BINARY_INV+cv.THRESH_OTSU)[1]
    name = pytesseract.image_to_string(monster_name_thresh, config='--psm 6')
    print(name)

    cv.imshow('ROI', ROI)
    cv.imshow('Cropped Thresh', monster_name_thresh)
    cv.drawContours(img, contours, i, (0, 255, 0), 5)
    cv.imshow('Result', img)
    cv.waitKey(0)
    cv.destroyAllWindows()

    if cv.waitKey(1) == ord('q'):
        cv.destroyAllWindows()

exit()
