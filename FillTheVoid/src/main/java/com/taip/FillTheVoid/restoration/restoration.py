import cv2
import sys
import json

if __name__ == '__main__':

    json_corners = sys.argv[1]

    print(json_corners)


    corners = json.loads(json_corners)

    left_up_x = corners["leftUp"]["x"]
    left_up_y = corners["leftUp"]["y"]

    # Accesăm coordonatele 'RightUp'
    right_up_x = corners["rightUp"]["x"]
    right_up_y = corners["rightUp"]["y"]

    # Accesăm coordonatele 'LeftDown'
    left_down_x = corners["leftDown"]["x"]
    left_down_y = corners["leftDown"]["y"]

    # Accesăm coordonatele 'RightDown'
    right_down_x = corners["rightDown"]["x"]
    right_down_y = corners["rightDown"]["y"]

    # Afișăm coordonatele
#     print("LeftUp x:", left_up_x, ", y:", left_up_y)
#     print("RightUp x:", right_up_x, ", y:", right_up_y)
#     print("LeftDown x:", left_down_x, ", y:", left_down_y)
#     print("RightDown x:", right_down_x, ", y:", right_down_y)


    file_path = "src/main/java/com/taip/FillTheVoid/restoration/restored_image.png"

    image = cv2.imread(file_path)
    image_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    height, width, channels = image.shape
    print(f"Image Dimensions: {height}x{width}, Channels: {channels}")

    # Display the image using OpenCV
#     cv2.imshow("Restored Image", image)

    result = cv2.imwrite(file_path, image_gray)


    # Wait until a key is pressed and then close the window
#     cv2.waitKey(0)
#     cv2.destroyAllWindows()

    print("a")

