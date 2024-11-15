import cv2

if __name__ == '__main__':

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

